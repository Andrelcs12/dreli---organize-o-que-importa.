import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import {
  CurrentUser,
  type AuthenticatedUser,
} from '../../common/auth/authenticated-user.decorator.js';
import { SupabaseAuthGuard } from '../../common/auth/supabase-auth.guard.js';
import type { CreateSavedLinkDto, UpdateSavedLinkDto } from './dto/saved-link.dto.js';
import { SavedLinksService } from './saved-links.service.js';

@Controller('saved-links')
@UseGuards(SupabaseAuthGuard)
export class SavedLinksController {
  constructor(private readonly savedLinksService: SavedLinksService) {}

  @Get()
  list(@CurrentUser() user: AuthenticatedUser, @Query('view') view?: string) {
    return this.savedLinksService.list(user.id, view);
  }

  @Post()
  create(@CurrentUser() user: AuthenticatedUser, @Body() input: CreateSavedLinkDto) {
    return this.savedLinksService.create(user.id, input);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() input: UpdateSavedLinkDto,
  ) {
    return this.savedLinksService.update(user.id, id, input);
  }

  @Delete(':id')
  remove(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.savedLinksService.remove(user.id, id);
  }
}
