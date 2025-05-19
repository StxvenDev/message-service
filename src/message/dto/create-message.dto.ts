import { IsEnum, IsOptional, IsString } from "class-validator";
// import { stateMessage } from "../enum/state-message.enum";

export class CreateMessageDto {
  @IsString()
  message:string

  @IsString()
  addresses: string

  @IsOptional()
  files: any[]
}
