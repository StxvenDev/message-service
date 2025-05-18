import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [envs.rabbitmqUrl],
      queue: 'message-queue',
      queueOptions: {
        durable: true
      },
    }
  });
  await app.listen();
}
bootstrap();
