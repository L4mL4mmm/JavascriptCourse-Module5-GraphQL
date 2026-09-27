// src/modules/posts/posts.resolver.ts
import { Resolver, Query, ResolveField, Parent, Context } from '@nestjs/graphql';
import { PostItem } from './models/post-item.model';
import { Author } from './loaders/author.loader';

@Resolver(() => PostItem)
export class PostsResolver {
  @Query(() => [PostItem])
  posts(): PostItem[] {
    // 100 bài viết nhưng chỉ thuộc về 2 tác giả
    return Array.from({ length: 100 }, (_, i) => ({
      id: `post_${i + 1}`,
      title: `Bài viết số ${i + 1}`,
      authorId: i % 2 === 0 ? 'auth_1' : 'auth_2',
    }));
  }

  @ResolveField(() => Author)
  async author(@Parent() post: PostItem, @Context() context: any): Promise<Author> {
    // DataLoader tự động gom toàn bộ 100 lần gọi này vào 1 câu SELECT duy nhất
    return context.loaders.authorLoader.load(post.authorId);
  }
}