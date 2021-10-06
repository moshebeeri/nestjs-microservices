import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { ProductService } from './product.service';
import { Client, ClientKafka, Ctx, KafkaContext, MessagePattern, Payload, Transport } from "@nestjs/microservices";
import { Consumer, Kafka } from 'kafkajs';

@Controller('product')
export class ProductController {

  kafka: Kafka
  consumer: Consumer
  constructor(private productService: ProductService){
    console.log('on construct')
     this.kafka = new Kafka({
      clientId: 'kafkaSample',
      brokers: ['kafka-0.kafka-headless.default.svc.cluster.local:9092'],
    })
    this.consumer = this.kafka.consumer({ groupId: 'products-consumer' })
   }

  @Get()
  async all() {
    this.client.send('products-topic', 'Get All Products')
    return this.productService.findAll()
  }
  
  @Post()
  async create(@Body('name') name: string) {
    console.log('kafka product create ')
    this.client.emit<string>('products-topic', 'Product ' + name +' Created')
    this.client.send('products-topic', 'Product ' + name +' Created')
    return this.productService.create(new CreateProductDto(name))
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    this.client.send('products-topic', 'Getting Product ' + id)
    return this.productService.one(id);
  }
  @Put((':id'))
  async update(@Param('id') id: string, @Body() productDto: CreateProductDto) {
    this.client.send('products-topic', 'Updating Product ' + id)
    return this.productService.update(id, productDto)
  }
  
  @Delete((':id'))
  async delete(@Param('id') id: string) {
    this.client.send('products-topic', 'Deleting Product ' + id)
    return this.productService.delete(id)
  }
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'kafkaSample',
        brokers: ['kafka-0.kafka-headless.default.svc.cluster.local:9092'],
      },
      consumer: {
        groupId: 'products-consumer' 
      }
    }
  })
  client: ClientKafka;

  async onModuleInit() {
    console.log('on module')
    this.consumer.subscribe({ topic: 'products-topic', fromBeginning: false })
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
          console.log({
              //key: message.key.toString(),
              value: message.value.toString(),
              //headers: message.headers,
          })
      },
  })
  
  // Need to subscribe to topic 
  // so that we can get the response from kafka microservice
  this.client.subscribeToResponseOf('products-topic');
    await this.client.connect();
  }

  @MessagePattern('products-topic')
  onProductTopic(@Payload() message: any, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const { headers, timestamp } = originalMessage;
    console.log(JSON.stringify(message))
  }
}
//https://dev.to/kannndev/kafka-nest-js-248