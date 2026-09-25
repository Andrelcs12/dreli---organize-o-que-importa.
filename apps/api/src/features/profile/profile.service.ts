import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
import type { CompleteOnboardingDto } from './dto/complete-onboarding.dto.js';

const priorityIds = [
  'day',
  'references',
  'studies',
  'routine',
  'ideas',
] as const;

type PriorityId = (typeof priorityIds)[number];

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  findOrCreate(id: string) {
    return this.prisma.profile.upsert({
      create: { id },
      update: {},
      where: { id },
    });
  }

  async completeOnboarding(id: string, input: CompleteOnboardingDto) {
    const name = this.validateName(input.name);
    const priorities = this.validatePriorities(input.priorities);

    return this.prisma.profile.upsert({
      create: {
        id,
        name,
        onboardingCompletedAt: new Date(),
        priorities,
      },
      update: {
        name,
        onboardingCompletedAt: new Date(),
        priorities,
      },
      where: { id },
    });
  }

  private validateName(value: unknown) {
    if (typeof value !== 'string') {
      throw new BadRequestException('Name must be a string.');
    }

    const name = value.trim();

    if (!name || name.length > 100) {
      throw new BadRequestException('Name must contain between 1 and 100 characters.');
    }

    return name;
  }

  private validatePriorities(value: unknown): PriorityId[] {
    if (!Array.isArray(value) || value.length < 1 || value.length > 3) {
      throw new BadRequestException('Choose between one and three priorities.');
    }

    if (
      value.some(
        (priority) =>
          typeof priority !== 'string' || !priorityIds.includes(priority as PriorityId),
      )
    ) {
      throw new BadRequestException('One or more priorities are invalid.');
    }

    if (new Set(value).size !== value.length) {
      throw new BadRequestException('Priorities cannot be duplicated.');
    }

    return value as PriorityId[];
  }
}
