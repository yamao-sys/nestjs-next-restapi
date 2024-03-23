import { ApiProperty } from '@nestjs/swagger';

export class FetchTodoDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}
