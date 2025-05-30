import {
    Controller, Post, Body, Param, UseGuards,
    Req, Get, Query, Delete, ForbiddenException
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts/:postId/comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    // Creates comment
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createComment(
        @Param('postId') postId: string,
        @Body() createCommentDto: CreateCommentDto,
        @Req() req,
    ) {
        const userId = req.user.id;
        const comment = await this.commentsService.createComment(userId, postId, createCommentDto);
        return {
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt,
            username: comment.user.username,
        };
    }

    // Fetch all comments
    @Get()
    async getComments(
        @Param('postId') postId: string,
        @Query('cursor') cursor: string,
    ) {
        const result = await this.commentsService.getComments(postId, cursor);
        return result;
    }

    // Deletes a comment
    @UseGuards(AuthGuard('jwt'))
    @Delete(':commentId')
    async deleteComment(
        @Param('postId') postId: string,
        @Param('commentId') commentId: string,
        @Req() req,
    ) {
        const userId = req.user.id;
        const success = await this.commentsService.deleteComment(userId, postId, commentId);
        if (!success) throw new ForbiddenException('You are not allowed to delete this comment.');
        return { message: 'Comment deleted successfully' };
    }
}
