import { IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @Length(1, 500, { message: 'Content must be between 1 and 500 characters' })
  content: string;
}
