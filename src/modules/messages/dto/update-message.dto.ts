import {IsDefined, IsNotEmpty, IsString} from "class-validator";

export class UpdateMessageDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  text: string;
}
