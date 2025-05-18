import { Module } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { AzureTableModule } from './azure/azure-table.module';

@Module({
  imports: [MessageModule, AzureTableModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
