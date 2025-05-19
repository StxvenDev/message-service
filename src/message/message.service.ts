import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { v4 as uuid } from 'uuid';
import { AzureTableService } from 'src/azure/azure-table.service';
import { IAzureMessageTable } from 'src/azure/interfaces/azure-table.interface';
import { MimeTypeFile } from './enum/mimetype-file.enum';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class MessageService {
  constructor(
    private readonly azureTableService: AzureTableService,
  ) { }

  async create(createMessageDto: CreateMessageDto) {
    const { files } = createMessageDto
    console.log(files)
    if (files) {
      const allowedTypes = Object.values(MimeTypeFile);
      const metaFile = files.map((file) => {
        if (allowedTypes.includes(file.mimetype)) {
          return {
            name: file.originalname,
            type: file.mimetype,
          }
        } else {
          throw new RpcException({
            status: HttpStatus.BAD_REQUEST,
            message: 'Invalid file type uploaded',
          })
        }
      })
    }
    const id = uuid()
    const insertTable: IAzureMessageTable = {
      id: id,
      message: createMessageDto.message,
      addressees: createMessageDto.addressees,
      url: 'exaple.com',
    }
    return await this.azureTableService.saveMessage(insertTable);
  }
}
