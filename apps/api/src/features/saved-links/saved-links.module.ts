import { Module } from '@nestjs/common';
import { SupabaseAuthModule } from '../../common/auth/supabase-auth.module.js';
import { PrismaModule } from '../../common/database/prisma.module.js';
import { SavedLinksController } from './saved-links.controller.js';
import { SavedLinksService } from './saved-links.service.js';

@Module({
  imports: [PrismaModule, SupabaseAuthModule],
  controllers: [SavedLinksController],
  providers: [SavedLinksService],
})
export class SavedLinksModule {}
