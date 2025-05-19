import { IsEnum, IsString } from "class-validator";
// import { stateMessage } from "../enum/state-message.enum";

export class CreateMessageDto {
  @IsString()
  message:string

  @IsString()
  addressees: string

  files: any[]
}
