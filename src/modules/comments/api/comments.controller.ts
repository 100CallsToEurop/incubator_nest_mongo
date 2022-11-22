import { Controller, Get, Param } from '@nestjs/common';
import { Types } from 'mongoose';
import { ParseObjectIdPipe } from '../../../common/pipe/validation.objectid.pipe';
import { CommentsService } from '../application/comments.service';
import { CommentViewModel } from '../application/dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':id')
  async getComment(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<CommentViewModel> {
    return await this.commentsService.getCommentById(id);
  }
}
