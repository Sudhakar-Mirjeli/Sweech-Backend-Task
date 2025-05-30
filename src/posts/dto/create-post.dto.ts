import { IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(1, 30, { message: 'Title must be between 1 and 30 characters' })
  title: string;

  @IsString()
  @Length(1, 1000, { message: 'Content must be between 1 and 1000 characters' })
  content: string;
}
