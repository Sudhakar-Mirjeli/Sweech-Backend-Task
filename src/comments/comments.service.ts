
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  // creates a comment
  async createComment(userId: string, postId: string, dto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: {
        content: dto.content,
        user: { connect: { id: userId } },
        post: { connect: { id: postId } },
      },
      include: {
        user: true,
      },
    });
  }

  // Fetch comments
  async getComments(postId: string, cursor?: string) {
    const take = 10;
    const comments = await this.prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'desc' },
      take,
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),
      include: {
        user: true,
      },
    });

    const nextCursor = comments.length === take ? comments[comments.length - 1].id : null;

    return {
      comments: comments.map(c => ({
        id: c.id,
        content: c.content,
        createdAt: c.createdAt,
        username: c.user.username,
      })),
      nextCursor,
    };
  }

  // Deletes comment
  async deleteComment(userId: string, postId: string, commentId: string): Promise<boolean> {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      include: { user: true, post: true },
    });

    if (!comment || comment.postId !== postId) throw new NotFoundException('Comment not found');

    // Only comment owner or post owner can delete
    const post = await this.prisma.post.findUnique({ where: { id: postId } });

    if (comment.userId !== userId && post?.userId !== userId) {
      return false;
    }

    await this.prisma.comment.delete({ where: { id: commentId } });
    return true;
  }
}

