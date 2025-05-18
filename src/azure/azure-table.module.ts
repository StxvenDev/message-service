import { Module } from '@nestjs/common';
import { AzureTableService } from './azure-table.service';


@Module({
  providers: [AzureTableService],
  exports: [AzureTableService],
})
export class AzureTableModule {}
