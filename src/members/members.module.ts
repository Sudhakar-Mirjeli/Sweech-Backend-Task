import { Module } from '@nestjs/common';
import { MemberService } from './members.service';
import { MemberController } from './members.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
import { LoginRecordsService } from 'src/login-records/login-records.service';


@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '20m' },
    }),
  ],
  providers: [MemberService, PrismaService, JwtStrategy, LoginRecordsService],
  controllers: [MemberController]
})
export class MembersModule {}
