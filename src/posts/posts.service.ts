import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
    constructor(private readonly prisma: PrismaService) { }

    // Creates post
    async createPost(userId: string, createPostDto: CreatePostDto) {
        return this.prisma.post.create({
            data: {
                title: createPostDto.title,
                content: createPostDto.content,
                user: {
                    connect: { id: userId },
                },
            },
            include: {
                user: true,
            },
        });
    }

    // Get posts
    async findPostsWithPagination(skip: number, take: number) {
        return this.prisma.post.findMany({
            skip,
            take,
            orderBy: { createdAt: 'desc' },
            include: { user: true },
        });
    }

    // Counts posts
    async countPosts() {
        return this.prisma.post.count();
    }

    // Fetch post by id
    async findPostById(id: string) {
        return this.prisma.post.findUnique({
            where: { id },
            include: { user: true },
        });
    }
}
