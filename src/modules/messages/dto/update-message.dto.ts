import {IsDefined, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateMessageDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  text: string;
}
