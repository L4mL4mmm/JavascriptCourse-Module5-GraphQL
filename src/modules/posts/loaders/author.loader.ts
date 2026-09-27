// src/modules/posts/loaders/author.loader.ts
import DataLoader from 'dataloader';

export interface Author {
  id: string;
  name: string;
}

// Giả lập hàm gọi Database (IN query) gom nhiều ID
async function batchGetAuthors(authorIds: readonly string[]): Promise<(Author | Error)[]> {
  console.log(`[DATABASE QUERY] SELECT * FROM authors WHERE id IN (${authorIds.join(',')})`);

  const mockDatabase: Record<string, Author> = {
    auth_1: { id: 'auth_1', name: 'Nguyễn Văn A' },
    auth_2: { id: 'auth_2', name: 'Trần Thị B' },
  };

  // DataLoader yêu cầu mảng trả về phải giữ nguyên đúng thứ tự của mảng keys truyền vào
  return authorIds.map((id) => mockDatabase[id] || new Error(`Author not found: ${id}`));
}

export const createAuthorLoader = () => new DataLoader<string, Author>(batchGetAuthors);