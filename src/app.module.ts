import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource  } from 'typeorm';
import { Category } from './category/entities/category.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { Post } from './posts/entities/post.entity';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    CategoryModule,
    PostsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DBNAME,
      entities: [Category, Post, User],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
