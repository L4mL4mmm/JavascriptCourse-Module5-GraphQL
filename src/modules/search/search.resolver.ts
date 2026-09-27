// src/modules/search/search.resolver.ts
import { Resolver, Query, Args } from '@nestjs/graphql';
import { SearchResultUnion, SearchPost, SearchUser } from './models/search-result.union';

@Resolver()
export class SearchResolver {
  @Query(() => [SearchResultUnion])
  search(@Args('keyword') _keyword: string): Array<SearchPost | SearchUser> {
    const post: SearchPost = {
      id: 'p_1',
      title: 'Học NestJS GraphQL cơ bản',
      content: 'Nội dung bài viết kiến trúc Microservice',
    };
    const user: SearchUser = {
      id: 'u_1',
      username: 'dev_hust',
      email: 'minhla@sis.hust.edu.vn',
    };
    return [post, user];
  }
}