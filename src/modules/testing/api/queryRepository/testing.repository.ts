import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../../modules/users/domain/model/user.schema';
import { Blog } from '../../../../modules/blogs/domain/model/blog.schema';
import { Post } from '../../../../modules/posts/domain/model/post.schema';
import { Comments } from '../../../../modules/comments/domain/model/comment.schema';

@Injectable()
export class TestingQueryRepository {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Comments.name) private readonly commentModel: Model<Comments>,
  ) {}

  async deleteAll() {
    await this.blogModel.deleteMany({});
    await this.postModel.deleteMany({});
    await this.userModel.deleteMany({});
    await this.commentModel.deleteMany({});
  }
}
