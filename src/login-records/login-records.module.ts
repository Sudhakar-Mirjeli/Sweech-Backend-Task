import { Module } from '@nestjs/common';
import { LoginRecordsService } from './login-records.service';
import { LoginRecordsController } from './login-records.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [LoginRecordsService, PrismaService],
  controllers: [LoginRecordsController]
})
export class LoginRecordsModule {}
