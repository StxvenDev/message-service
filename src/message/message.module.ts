import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { AzureTableModule } from 'src/azure/azure-table.module';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports: [AzureTableModule],
})
export class MessageModule {}
