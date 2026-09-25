import { Module } from '@nestjs/common';
import { SupabaseAuthModule } from '../../common/auth/supabase-auth.module.js';
import { PrismaModule } from '../../common/database/prisma.module.js';
import { ProfileController } from './profile.controller.js';
import { ProfileService } from './profile.service.js';

@Module({
  imports: [PrismaModule, SupabaseAuthModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
