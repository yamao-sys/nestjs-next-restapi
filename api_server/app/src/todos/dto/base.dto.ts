import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}
