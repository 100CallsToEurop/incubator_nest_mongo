import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IComment,
  ILikeInfo,
  INewestLikes,
  LikeStatus,
} from '../interfaces/comment.interface';

@Schema({ collection: 'users-comment-container' })
export class NewestLikes extends Document implements INewestLikes {
  @Prop({ required: true, type: String })
  userId: string;
  @Prop({
    required: true,
    enum: LikeStatus,
    default: LikeStatus.NONE,
    type: String,
  })
  status: LikeStatus;
}
export const NewestLikesSchema = SchemaFactory.createForClass(NewestLikes);

@Schema({ collection: 'like-info' })
export class LikeInfo extends Document implements ILikeInfo {
  @Prop({ required: true, type: Number })
  likesCount: number;
  @Prop({ required: true, type: Number })
  dislikesCount: number;
  @Prop({
    required: true,
    enum: LikeStatus,
    default: LikeStatus.NONE,
    type: String,
  })
  myStatus: LikeStatus;
  @Prop({
    required: true,
    type: [NewestLikesSchema],
    default: [],
  })
  newestLikes: INewestLikes[];
}
export const LikeInfoSchema = SchemaFactory.createForClass(LikeInfo);

@Schema({ collection: 'comments' })
export class Comments extends Document implements IComment {
  @Prop({ required: true, type: String })
  content: string;
  @Prop({ required: true, type: String })
  userId: string;
  @Prop({ required: true, type: String })
  userLogin: string;
  @Prop({ required: true, type: String })
  postId: string;
  @Prop({ required: true, type: Date })
  createdAt: Date;
  @Prop({ required: true, type: LikeInfoSchema })
  likesInfo: ILikeInfo;
}
export const CommentsSchema = SchemaFactory.createForClass(Comments);
