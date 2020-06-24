import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from '@nestjs/platform-express';
import {join} from 'path';

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname,'public'));
  app.enableCors();
  await app.listen(3000);
  console.log('🔐 server on port 3000'); 
}
main();
