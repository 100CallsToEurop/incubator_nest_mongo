import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Types } from 'mongoose';

//Services
import { PostsService } from '../application/posts.service';
import { CommentsService } from '../../../modules/comments/application/comments.service';

//DTO
import { PostPaginator, PostViewModel } from '../application/dto';

//Pipe
import { ParseObjectIdPipe } from '../../../common/pipe/validation.objectid.pipe';

//Models
import { PostInputModel } from './models';

import { PaginatorInputModel } from '../../paginator/models/query-params.model';
import { CommentPaginator } from '../../../modules/comments/application/dto';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get()
  async getPosts(@Query() query?: PaginatorInputModel): Promise<PostPaginator> {
    return await this.postsService.getPosts(query);
  }

  @Get(':id')
  async getPost(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<PostViewModel> {
    return await this.postsService.getPostById(id);
  }

  @HttpCode(204)
  @Delete(':id')
  async deletePost(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<void> {
    await this.postsService.deletePostById(id);
  }

  @Post()
  async createPost(
    @Body() createPostParams: PostInputModel,
  ): Promise<PostViewModel> {
    return await this.postsService.createPost(createPostParams);
  }

  @HttpCode(204)
  @Put(':id')
  async updatePost(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() updatePostParams: PostInputModel,
  ) {
    await this.postsService.updatePostById(id, updatePostParams);
  }

  @Get(':postId/comments')
  async getComments(
    @Param('postId') postId: string,
    @Query() query?: PaginatorInputModel,
  ): Promise<CommentPaginator> {
    return await this.commentsService.getComments(query, postId);
  }
}
