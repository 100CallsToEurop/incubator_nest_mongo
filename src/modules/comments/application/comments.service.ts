import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

import { CommentsRepository } from '../infrastructure/comments.repository';
import { CommentPaginator, CommentViewModel } from './dto';
import { IComment, LikeStatus } from '../domain/interfaces/comment.interface';
import { PaginatorInputModel } from '../../../modules/paginator/models/query-params.model';
@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  buildResponseComment(comment: IComment): CommentViewModel {
    return {
      id: comment._id.toString(),
      content: comment.content,
      userId: comment.userId,
      userLogin: comment.userLogin,
      createdAt: comment.createdAt.toISOString(),
      likesInfo: {
        likesCount: comment.likesInfo.likesCount,
        dislikesCount: comment.likesInfo.dislikesCount,
        myStatus: LikeStatus.NONE,
      },
    };
  }

  async getComments(
    query?: PaginatorInputModel,
    postId?: string,
  ): Promise<CommentPaginator> {
    const post = await this.commentsRepository.getGetPost(
      new Types.ObjectId(postId),
    );
    if (!post) {
      throw new NotFoundException();
    }
    const comments = await this.commentsRepository.getComments(query, postId);
    return {
      ...comments,
      items: comments.items.map((item) => this.buildResponseComment(item)),
    };
  }

  async getCommentById(id: Types.ObjectId): Promise<CommentViewModel> {
    const comment = await this.commentsRepository.getCommentById(id);
    if (!comment) {
      throw new NotFoundException();
    }
    return this.buildResponseComment(comment);
  }
}
