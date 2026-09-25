import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const webOrigins = process.env.WEB_ORIGIN?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (webOrigins?.length) {
    app.enableCors({
      credentials: true,
      origin: webOrigins,
    });
  }

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
