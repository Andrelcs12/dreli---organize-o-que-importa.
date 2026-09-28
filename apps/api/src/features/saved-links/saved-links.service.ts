import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
import type { CreateSavedLinkDto, UpdateSavedLinkDto } from './dto/saved-link.dto.js';

const views = ['dashboard', 'links', 'inbox', 'library', 'favorites', 'archived'] as const;
const statuses = ['INBOX', 'LIBRARY', 'ARCHIVED'] as const;
const metadataLimit = 250_000;
const metadataTimeout = 4_500;

type SavedLinkView = (typeof views)[number];
type SavedLinkStatus = (typeof statuses)[number];
type LinkMetadata = {
  description: string | null;
  domain: string;
  imageUrl: string | null;
  title: string | null;
  url: string;
};

@Injectable()
export class SavedLinksService {
  constructor(private readonly prisma: PrismaService) {}

  async list(profileId: string, view?: string) {
    const selectedView = this.validateView(view);
    const where = this.getViewWhere(profileId, selectedView);
    const [items, inbox, library, favorites, archived] = await Promise.all([
      this.prisma.savedLink.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.savedLink.count({ where: { profileId, status: 'INBOX' } }),
      this.prisma.savedLink.count({ where: { profileId, status: 'LIBRARY' } }),
      this.prisma.savedLink.count({
        where: { profileId, isFavorite: true, status: { not: 'ARCHIVED' } },
      }),
      this.prisma.savedLink.count({ where: { profileId, status: 'ARCHIVED' } }),
    ]);

    return { counts: { archived, favorites, inbox, library }, items };
  }

  async create(profileId: string, input: CreateSavedLinkDto) {
    const normalizedUrl = this.normalizeUrl(input.url);
    await this.assertPublicHost(normalizedUrl);

    const metadata = await this.fetchMetadata(normalizedUrl);
    const url = metadata?.url ?? normalizedUrl.toString();

    await this.prisma.profile.upsert({
      where: { id: profileId },
      create: { id: profileId },
      update: {},
    });

    try {
      return await this.prisma.savedLink.create({
        data: {
          profileId,
          url,
          domain: metadata?.domain ?? normalizedUrl.hostname,
          title: metadata?.title,
          description: metadata?.description,
          imageUrl: metadata?.imageUrl,
        },
      });
    } catch (error) {
      if (this.isDuplicateError(error)) {
        throw new ConflictException('Este link já está salvo no seu espaço.');
      }
      throw error;
    }
  }

  async update(profileId: string, id: string, input: UpdateSavedLinkDto) {
    const data = this.validateUpdate(input);
    const link = await this.prisma.savedLink.findFirst({
      where: { id, profileId },
      select: { id: true },
    });

    if (!link) {
      throw new NotFoundException('Link não encontrado.');
    }

    return this.prisma.savedLink.update({ where: { id: link.id }, data });
  }

  async remove(profileId: string, id: string) {
    const result = await this.prisma.savedLink.deleteMany({
      where: { id, profileId },
    });

    if (!result.count) {
      throw new NotFoundException('Link não encontrado.');
    }

    return { id };
  }

  private validateView(value: string | undefined): SavedLinkView {
    if (!value) return 'dashboard';
    if (views.includes(value as SavedLinkView)) return value as SavedLinkView;
    throw new BadRequestException('Visualização de links inválida.');
  }

  private getViewWhere(profileId: string, view: SavedLinkView) {
    if (view === 'dashboard') return { profileId };
    if (view === 'inbox') return { profileId, status: 'INBOX' as const };
    if (view === 'library') return { profileId, status: 'LIBRARY' as const };
    if (view === 'favorites') {
      return { profileId, isFavorite: true, status: { not: 'ARCHIVED' as const } };
    }
    if (view === 'archived') return { profileId, status: 'ARCHIVED' as const };
    return { profileId, status: { not: 'ARCHIVED' as const } };
  }

  private normalizeUrl(value: unknown) {
    if (typeof value !== 'string' || !value.trim()) {
      throw new BadRequestException('Informe um link válido.');
    }

    let url: URL;
    try {
      url = new URL(value.trim());
    } catch {
      throw new BadRequestException('Informe uma URL completa, incluindo https://.');
    }

    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      throw new BadRequestException('Apenas links HTTP ou HTTPS são aceitos.');
    }

    if (!url.hostname || this.isBlockedHostname(url.hostname)) {
      throw new BadRequestException('Este destino não pode ser consultado com segurança.');
    }

    url.hash = '';
    url.hostname = url.hostname.toLowerCase();
    if ((url.protocol === 'https:' && url.port === '443') || (url.protocol === 'http:' && url.port === '80')) {
      url.port = '';
    }

    return url;
  }

  private async assertPublicHost(url: URL) {
    if (this.isBlockedHostname(url.hostname)) {
      throw new BadRequestException('Este destino não pode ser consultado com segurança.');
    }

    try {
      const records = await lookup(url.hostname, { all: true, verbatim: true });
      if (!records.length || records.some((record) => this.isPrivateAddress(record.address))) {
        throw new Error('unsafe-host');
      }
    } catch {
      throw new BadRequestException('Não foi possível consultar esse destino com segurança.');
    }
  }

  private async fetchMetadata(initialUrl: URL): Promise<LinkMetadata | null> {
    let url = initialUrl;

    try {
      for (let redirectCount = 0; redirectCount < 4; redirectCount += 1) {
        await this.assertPublicHost(url);
        const response = await fetch(url, {
          redirect: 'manual',
          signal: AbortSignal.timeout(metadataTimeout),
          headers: {
            Accept: 'text/html,application/xhtml+xml',
            'User-Agent': 'Dreli Link Preview/1.0',
          },
        });

        if (response.status >= 300 && response.status < 400) {
          const location = response.headers.get('location');
          if (!location) return null;
          url = this.normalizeUrl(new URL(location, url).toString());
          continue;
        }

        if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) {
          return null;
        }

        const html = await this.readHtml(response);
        return this.parseMetadata(html, url);
      }
    } catch {
      return null;
    }

    return null;
  }

  private async readHtml(response: Response) {
    const reader = response.body?.getReader();
    if (!reader) return '';

    const chunks: Uint8Array[] = [];
    let total = 0;

    while (total < metadataLimit) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      chunks.push(value);
    }

    await reader.cancel();
    const html = new TextDecoder().decode(Buffer.concat(chunks));
    return html.slice(0, metadataLimit);
  }

  private parseMetadata(html: string, url: URL): LinkMetadata {
    const title = this.cleanText(
      this.metaContent(html, 'property', 'og:title') ?? this.titleTag(html),
      300,
    );
    const description = this.cleanText(
      this.metaContent(html, 'property', 'og:description') ??
        this.metaContent(html, 'name', 'description'),
      500,
    );
    const rawImage = this.metaContent(html, 'property', 'og:image');
    const imageUrl = this.toPublicUrl(rawImage, url);

    return {
      url: url.toString(),
      domain: url.hostname.replace(/^www\./, ''),
      title,
      description,
      imageUrl,
    };
  }

  private metaContent(html: string, attribute: 'name' | 'property', value: string) {
    const expression = new RegExp(
      `<meta[^>]+${attribute}=["']${value}["'][^>]+content=["']([^"']+)["'][^>]*>`,
      'i',
    );
    const reverseExpression = new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+${attribute}=["']${value}["'][^>]*>`,
      'i',
    );
    return html.match(expression)?.[1] ?? html.match(reverseExpression)?.[1] ?? null;
  }

  private titleTag(html: string) {
    return html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? null;
  }

  private cleanText(value: string | null, maxLength: number) {
    if (!value) return null;
    const text = value
      .replace(/<[^>]+>/g, ' ')
      .replace(/&(?:amp|quot|#39|lt|gt);/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return text ? text.slice(0, maxLength) : null;
  }

  private toPublicUrl(value: string | null, baseUrl: URL) {
    if (!value) return null;
    try {
      const url = this.normalizeUrl(new URL(value, baseUrl).toString());
      return url.toString();
    } catch {
      return null;
    }
  }

  private isBlockedHostname(hostname: string) {
    const normalized = hostname.toLowerCase().replace(/\.$/, '');
    return (
      normalized === 'localhost' ||
      normalized.endsWith('.localhost') ||
      normalized.endsWith('.local') ||
      this.isPrivateAddress(normalized)
    );
  }

  private isPrivateAddress(address: string) {
    const version = isIP(address);
    if (version === 4) {
      const [first, second] = address.split('.').map(Number);
      return (
        first === 0 ||
        first === 10 ||
        first === 127 ||
        first === 169 && second === 254 ||
        first === 172 && second >= 16 && second <= 31 ||
        first === 192 && second === 168 ||
        first === 100 && second >= 64 && second <= 127
      );
    }

    if (version === 6) {
      const normalized = address.toLowerCase();
      return (
        normalized === '::' ||
        normalized === '::1' ||
        normalized.startsWith('fc') ||
        normalized.startsWith('fd') ||
        normalized.startsWith('fe80:') ||
        normalized.startsWith('::ffff:127.') ||
        normalized.startsWith('::ffff:10.') ||
        normalized.startsWith('::ffff:192.168.')
      );
    }

    return false;
  }

  private validateUpdate(input: UpdateSavedLinkDto) {
    const data: { isFavorite?: boolean; status?: SavedLinkStatus } = {};

    if (input.isFavorite !== undefined) {
      if (typeof input.isFavorite !== 'boolean') {
        throw new BadRequestException('O estado de favorito é inválido.');
      }
      data.isFavorite = input.isFavorite;
    }

    if (input.status !== undefined) {
      if (!statuses.includes(input.status as SavedLinkStatus)) {
        throw new BadRequestException('O estado do link é inválido.');
      }
      data.status = input.status as SavedLinkStatus;
    }

    if (!Object.keys(data).length) {
      throw new BadRequestException('Nenhuma alteração foi informada.');
    }

    return data;
  }

  private isDuplicateError(error: unknown) {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2002'
    );
  }
}
