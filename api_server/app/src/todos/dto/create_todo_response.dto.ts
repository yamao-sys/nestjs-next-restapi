import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoResponseDto {
  @ApiProperty({
    example: 'Next.jsの学習',
  })
  title: string;

  @ApiProperty({
    example: 'Next.jsのTODOリストを作成する',
  })
  content: string;

  @ApiProperty({
    example: ['タイトルは必須です。'],
  })
  errors: string[];
}
