import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { AzureTableModule } from 'src/azure/azure-table.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, FILE_MANAGMENT_SERVICE } from 'src/config';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports: [AzureTableModule,
    ClientsModule.register([
      {
        name: FILE_MANAGMENT_SERVICE,
        transport: Transport.RMQ,
        options:{
          urls: [envs.rabbitmqUrl],
          queue: 'files-queue',
          queueOptions: {
            durable: true
          },
        }
      }
    ])
  ],
})
export class MessageModule {}
