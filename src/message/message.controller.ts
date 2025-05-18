import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @MessagePattern('createMessage')
  create(@Payload() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

}
