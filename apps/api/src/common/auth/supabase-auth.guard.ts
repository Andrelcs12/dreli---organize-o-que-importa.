import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose';
import type { AuthenticatedUser } from './authenticated-user.decorator.js';

type RequestWithUser = Request & { user: AuthenticatedUser };

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  private readonly issuer: string;
  private readonly jwks: ReturnType<typeof createRemoteJWKSet>;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, '');

    if (!supabaseUrl) {
      throw new Error('SUPABASE_URL must be set before enabling authenticated routes.');
    }

    this.issuer = `${supabaseUrl}/auth/v1`;
    this.jwks = createRemoteJWKSet(
      new URL(`${this.issuer}/.well-known/jwks.json`),
    );
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.getBearerToken(request.headers.get('authorization'));

    if (!token) {
      throw new UnauthorizedException('Authentication is required.');
    }

    try {
      const { payload } = await jwtVerify(token, this.jwks, {
        audience: 'authenticated',
        issuer: this.issuer,
      });
      request.user = { id: this.getUserId(payload) };
      return true;
    } catch {
      throw new UnauthorizedException('The Supabase access token is invalid.');
    }
  }

  private getBearerToken(authorization: string | null) {
    const [scheme, token] = authorization?.split(' ') ?? [];
    return scheme === 'Bearer' && token ? token : undefined;
  }

  private getUserId(payload: JWTPayload) {
    if (typeof payload.sub !== 'string') {
      throw new UnauthorizedException('The Supabase access token has no subject.');
    }

    return payload.sub;
  }
}
