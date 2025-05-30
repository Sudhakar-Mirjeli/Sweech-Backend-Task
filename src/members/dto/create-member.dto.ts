import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateMemberDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @Length(12, 20, { message: 'Password must be between 12 and 20 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{12,20}$/, {
    message: 'Password must include lowercase letters, numbers, and special characters',
  })
  password: string;

  @IsString()
  @Length(1, 10, { message: 'Username must be 1 to 10 characters long' })
  @Matches(/^[가-힣]+$/, {
    message: 'Username must contain only Korean characters',
  })
  username: string;
}
