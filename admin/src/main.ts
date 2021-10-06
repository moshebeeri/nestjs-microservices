import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api')
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'kafkaSample',
        brokers: ['kafka-0.kafka-headless.default.svc.cluster.local:9092'],
      },
      consumer: {
        groupId: 'products-consumer',
      }
    }
  });
  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
