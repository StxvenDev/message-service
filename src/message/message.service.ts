import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import {v4 as uuid} from 'uuid';
import { AzureTableService } from 'src/azure/azure-table.service';
import { TableClient } from '@azure/data-tables';
import { IAzureMessageTable } from 'src/azure/interfaces/azure-table.interface';

@Injectable()
export class MessageService {
  constructor(
    private readonly azureTableService: AzureTableService,
  ){}

  async create(createMessageDto: CreateMessageDto) {
    const id = uuid()
    const insertTable: IAzureMessageTable = {
      id: id,
      message: createMessageDto.message,
      // state: createMessageDto.state,
      addressees: createMessageDto.addressees,
      url: 'exaple.com',
    } 
    return await this.azureTableService.saveMessage(insertTable);
  }
}
