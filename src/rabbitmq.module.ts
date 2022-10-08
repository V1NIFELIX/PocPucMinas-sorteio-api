import { Module } from '@nestjs/common';
import { AmqpModule } from 'nestjs-amqp';

@Module({
  imports: [
    AmqpModule.forRoot({
      name: 'rabbitmq',
      hostname: process.env.RABBIT_URL,
      username: process.env.RABBIT_USERNAME,
      password: process.env.RABBIT_PASSWORD,
      retryDelay: 1000,
      retrys: 20,
    }),
  ],
})
export default class RabbitModule {}
