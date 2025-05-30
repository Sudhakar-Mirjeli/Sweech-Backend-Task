import { IsOptional, Matches } from 'class-validator';

export class UpdateMemberDto {
  @IsOptional()
  @Matches(/^[가-힣]{1,10}$/, {
    message: 'Username must be in Korean and 1–10 characters long.',
  })
  username?: string;

  @IsOptional()
  @Matches(/^(?=.*[a-z])(?=.*[0-9])(?=.*[\W_])[a-zA-Z0-9\W_]{12,20}$/, {
    message:
      'Password must be 12–20 characters long and include lowercase letters, numbers, and special characters.',
  })
  password?: string;
}
