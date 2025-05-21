import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { TableClient, AzureNamedKeyCredential } from '@azure/data-tables';
import { envs } from 'src/config';
import { RpcException } from '@nestjs/microservices';
import { IAzureMessageTable } from './interfaces/azure-table.interface';
import { url } from 'inspector';

@Injectable()
export class AzureTableService {
  private readonly client: TableClient;

  constructor() {
    const account = envs.azureStorageAccount || '';
    const accountKey = envs.azureStorageAccessKey || '';
    const tableName = envs.azureTableName || 'messages';

    const credential = new AzureNamedKeyCredential(account, accountKey);
    this.client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);
  }

  async saveMessage(message: IAzureMessageTable) {
    const entity = {
      partitionKey: 'message',
      rowKey: Date.now().toString(),
      ...message,
    };

    try {
      await this.client.createEntity(entity);
      return {
        status: HttpStatus.CREATED,
        message: 'Mensaje guardado en la tabla de Azure',
        data: {
          ...message,
          url: message.url.split(',')
        },
      };
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al guardar el mensaje en la tabla de Azure',
        error: error.message,
      })
    }
  }
}
