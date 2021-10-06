import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, EventPattern, MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { Kafka } from 'kafkajs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // kafka: Kafka
   constructor(private readonly appService: AppService) {
    // console.log('on construct')
    //  this.kafka = new Kafka({
    //   clientId: 'kafkaSample',
    //   brokers: ['kafka-0.kafka-headless.default.svc.cluster.local:9092'],
    // })
    // const consumer = this.kafka.consumer({ groupId: 'products-consumer' })
    // consumer.subscribe({ topic: 'topic-B' })
   }
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
