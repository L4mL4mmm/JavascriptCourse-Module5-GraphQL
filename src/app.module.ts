// src/app.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { createAuthorLoader } from './modules/posts/loaders/author.loader';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      subscriptions: {
        'graphql-ws': true, // Chuẩn subscription websocket hiện đại
      },
      context: ({ req, extra }) => ({
        req,
        extra,
        // Khởi tạo loader mới cho mỗi request lifecycle để tránh rò rỉ cache giữa các user
        loaders: {
          authorLoader: createAuthorLoader(),
        },
      }),
    }),
  ],
})
export class AppModule {}