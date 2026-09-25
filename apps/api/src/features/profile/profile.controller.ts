import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import {
  CurrentUser,
  type AuthenticatedUser,
} from '../../common/auth/authenticated-user.decorator.js';
import { SupabaseAuthGuard } from '../../common/auth/supabase-auth.guard.js';
import type { CompleteOnboardingDto } from './dto/complete-onboarding.dto.js';
import { ProfileService } from './profile.service.js';

@Controller('profiles')
@UseGuards(SupabaseAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  getCurrentProfile(@CurrentUser() user: AuthenticatedUser) {
    return this.profileService.findOrCreate(user.id);
  }

  @Patch('me/onboarding')
  completeOnboarding(
    @CurrentUser() user: AuthenticatedUser,
    @Body() input: CompleteOnboardingDto,
  ) {
    return this.profileService.completeOnboarding(user.id, input);
  }
}
