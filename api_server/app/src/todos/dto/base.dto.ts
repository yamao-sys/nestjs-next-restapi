import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BaseDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'タイトルは必須です。' })
  title: string;

  @ApiProperty()
  content: string;
}
