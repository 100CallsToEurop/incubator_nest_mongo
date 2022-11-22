import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TestingModule } from './testing/testing.module';
import { getMongoConfig } from '../configs/mongo.config';
import { BlogsModule } from './blogs/blogs.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailerConfig } from '../configs/mailer.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRootAsync(getMongoConfig()),
    MailerModule.forRootAsync(getMailerConfig()),

    TestingModule,
    BlogsModule,
    PostsModule,
    UsersModule,

    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
