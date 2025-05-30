import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MembersModule } from './members/members.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { PrismaService } from '../prisma/prisma.service';
import { LoginRecordsModule } from './login-records/login-records.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MembersModule, PostsModule, CommentsModule, LoginRecordsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})

export class AppModule {}
