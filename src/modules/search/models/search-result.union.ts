// src/modules/search/models/search-result.union.ts
import { createUnionType, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SearchPost {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;
}

@ObjectType()
export class SearchUser {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;
}

export const SearchResultUnion = createUnionType({
  name: 'SearchResultUnion',
  types: () => [SearchPost, SearchUser] as const,
  resolveType(value) {
    if ('title' in value) return SearchPost;
    if ('username' in value) return SearchUser;
    return null;
  },
});