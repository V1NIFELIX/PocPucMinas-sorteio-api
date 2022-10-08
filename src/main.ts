import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rabbit = await app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT_URL],
      queue: process.env.RABBITMQ_CONSUMER_QUEUE_NAME,
      queueOptions: {
        durable: true,
      },
    },
  });
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Sorteio API')
    .setDescription('Sorteio API')
    .setVersion('2.0')
    .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('api/swagger/', app, document, { swaggerOptions: { displayRequestDuration: true } });

  app.use(bodyParser.json({ limit: 1024102420 }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.enableCors();
  await app.startAllMicroservices();
  await app.listen(process.env.PORT);
}
bootstrap();
