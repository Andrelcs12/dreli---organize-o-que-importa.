import { Module } from '@nestjs/common';
import { PrismaModule } from './common/database/prisma.module.js';
import { ProfileModule } from './features/profile/profile.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

@Module({
  imports: [PrismaModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
