import {
  Controller, Post, Body, Get, Query, Param, UseGuards,
  Req, HttpStatus, BadRequestException, NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  // Create a post 
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(@Req() req, @Body() createPostDto: CreatePostDto) {
    const userId = req.user.id;

    const post = await this.postService.createPost(userId, createPostDto);

    return {
      statusCode: HttpStatus.CREATED,
      data: {
        id: post.id,
        title: post.title,
        createdAt: post.createdAt.toISOString(),
      },
    };
  }

  // List posts with pagination
  @Get()
  async listPosts(@Query('page') page = '1',) {

    const pageNumber = parseInt(page, 10);

    if (isNaN(pageNumber) || pageNumber < 1) {
      throw new BadRequestException('Page number must be a positive integer');
    }

    const limit = 20;
    const skip = (pageNumber - 1) * limit;

    const [posts, totalCount] = await Promise.all([
      this.postService.findPostsWithPagination(skip, limit),
      this.postService.countPosts(),
    ]);
    return {
      statusCode: HttpStatus.OK,
      data: {
        totalPosts: totalCount,
        currentPage: pageNumber,
        posts: posts.map(post => ({
          id: post.id,
          title: post.title,
          username: post.user.username,
          createdAt: post.createdAt.toISOString(),
        })),
      },
    };
  }

  //Get post detail by ID
  @Get(':id')
  async getPostDetail(@Param('id') id: string) {
    const post = await this.postService.findPostById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        id: post.id,
        title: post.title,
        content: post.content,
        username: post.user.username,
        createdAt: post.createdAt.toISOString(),
      },
    };
  }
}
