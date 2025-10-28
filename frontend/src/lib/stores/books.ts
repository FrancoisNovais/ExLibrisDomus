import { createApiStore } from '$lib/stores/createApiStore';
import type { Book } from '$lib/types.ts';

export const {
  data: books,
  loading: loadingBooks,
  error: errorBooks,
  fetchAll: fetchBooks
} = createApiStore<Book>('books');
