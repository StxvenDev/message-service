import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { v4 as uuid } from 'uuid';
import { AzureTableService } from 'src/azure/azure-table.service';
import { IAzureMessageTable } from 'src/azure/interfaces/azure-table.interface';
import { MimeTypeFile } from './enum/mimetype-file.enum';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { FILE_MANAGMENT_SERVICE } from 'src/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MessageService {
  constructor(
    @Inject(FILE_MANAGMENT_SERVICE)
    private readonly fileManagmentService: ClientProxy,
    private readonly azureTableService: AzureTableService,
  ) { }

  async create(createMessageDto: CreateMessageDto) {
    const { files, message, addresses } = createMessageDto
    console.log(createMessageDto)
    let metaFiles = []
    if (files) {
      const allowedTypes = Object.values(MimeTypeFile);
        metaFiles = files.map((file) => {
        const base64 = file.buffer ? file.buffer.toString('base64') : null;
        if (allowedTypes.includes(file.mimetype)) {
          return {
            name: file.originalname,
            type: file.mimetype,
            content: base64,
          }
        } else {
          throw new RpcException({
            status: HttpStatus.BAD_REQUEST,
            message: 'Invalid file type uploaded',
          })
        }
      })
    }
    const urls : string[] = await lastValueFrom(
      this.fileManagmentService.send('upload-files', {
        files: metaFiles
      }
    ))

    console.log(files)
    const id = uuid()
    const insertTable: IAzureMessageTable = {
      id,
      message,
      addresses,
      url: urls.join(','),
    }
    return await this.azureTableService.saveMessage(insertTable);
  }
}
