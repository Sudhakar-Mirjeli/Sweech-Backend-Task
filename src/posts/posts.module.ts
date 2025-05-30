import { Module } from '@nestjs/common';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [PostService,PrismaService],
  controllers: [PostController]
})
export class PostsModule {

  
}
