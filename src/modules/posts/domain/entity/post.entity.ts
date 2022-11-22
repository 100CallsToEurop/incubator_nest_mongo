import { Types } from 'mongoose';
import { PostInputModel } from '../../api/models/post.model';
import { IExtendedLikesInfo, IPost, LikeStatus } from '../interfaces/post.interface';

export class PostEntity implements IPost {
  _id?: Types.ObjectId;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: Date;
  extendedLikesInfo: IExtendedLikesInfo;

  constructor(post: PostInputModel) {
    this._id = new Types.ObjectId();
    this.title = post.title;
    this.shortDescription = post.shortDescription;
    this.content = post.content;
    this.blogId = post.blogId;
    this.createdAt = new Date();
    this.extendedLikesInfo = {
      likesCount: 0,
      dislikesCount: 0,
      myStatus: LikeStatus.NONE,
      newestLikes: [],
    };
  }
}
