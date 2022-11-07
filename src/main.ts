import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('LabCar')
    .setDescription('The LabCar API')
    .setVersion('1.0')
    .addTag('drivers')
    .addTag('trips')
    .addTag('passengers')
    .build();

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const document = SwaggerModule.createDocument(app, config);

  const swaggerYaml = yaml.dump(document);
  writeFileSync('swagger.yaml', swaggerYaml);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
