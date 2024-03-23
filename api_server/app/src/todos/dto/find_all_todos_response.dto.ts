import { ApiProperty } from '@nestjs/swagger';

export class FetchAllTodosResponseDto {
  @ApiProperty()
  todos?:
    | {
        id: string;
        title: string;
        content: string;
      }[]
    | undefined;
}
