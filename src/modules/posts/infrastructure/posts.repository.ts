import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

//QueryParams
import {
  PaginatorInputModel,
  SortDirection,
} from '../../paginator/models/query-params.model';

//Scheme
import { Blog } from '../../../modules/blogs/domain/model/blog.schema';
import { Post } from '../domain/model/post.schema';

//Models
import { PostInputModel } from '../api/models/post.model';

//Entity
import { PostEntity } from '../domain/entity/post.entity';

//Interfaces
import { IPost, LikeStatus } from '../domain/interfaces/post.interface';

//DTO
import { PostPaginatorRepository} from '../application/dto';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async getPosts(
    query?: PaginatorInputModel,
    blogId?: string,
  ): Promise<PostPaginatorRepository> {
    //Filter
    let filter = this.postModel.find();
    let totalCount = (await this.postModel.find(filter).exec()).length;
    if (blogId) {
      filter.where({ blogId });
      totalCount = (await this.postModel.find(filter).exec()).length;
    }

    //Sort
    const sortDefault = 'createdAt';
    let sort = `-${sortDefault}`;
    if (query && query.sortBy && query.sortDirection) {
      query.sortDirection === SortDirection.DESC
        ? (sort = `-${query.sortBy}`)
        : (sort = `${query.sortBy}`);
    } else if (query && query.sortDirection) {
      query.sortDirection === SortDirection.DESC
        ? (sort = `-${sortDefault}`)
        : (sort = sortDefault);
    } else if (query && query.sortBy) {
      sort = `-${query.sortBy}`;
    }

    //Pagination
    const page = Number(query?.pageNumber) || 1;
    const pageSize = Number(query?.pageSize) || 10;
    const pagesCount = Math.ceil(totalCount / pageSize);
    const skip: number = (page - 1) * pageSize;

    const items = await this.postModel
      .find(filter)
      .skip(skip)
      .sort(sort)
      .limit(pageSize)
      .exec();

    return {
      pagesCount,
      page,
      pageSize,
      totalCount,
      items,
    };
  }

  async getPostById(_id: Types.ObjectId): Promise<IPost> {
    return await this.postModel.findById({ _id }).exec();
  }

  async deletePostById(_id: Types.ObjectId): Promise<boolean> {
    const deletePost = await this.postModel.findByIdAndDelete({ _id }).exec();
    return deletePost ? true : false;
  }

  async createPost(post: PostEntity, blogName: string): Promise<IPost> {
    const newPost = new this.postModel({ ...post, blogName });
   return newPost.save();
  }

  async updatePost(
    _id: Types.ObjectId,
    update: PostInputModel,
  ): Promise<boolean> {
    const updatePost = await this.postModel
      .findByIdAndUpdate({ _id }, update)
      .exec();
    return updatePost ? true : false;
  }

  async getGetBlog(_id: Types.ObjectId) {
    return await this.blogModel.findOne({ _id }).exec();
  }
}
