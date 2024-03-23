import { ApiProperty } from '@nestjs/swagger';

export class FetchTodoResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}
