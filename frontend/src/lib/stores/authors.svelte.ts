import { createApiStore } from '$lib/stores/createApiStore.svelte';
import type { Author } from '$lib/types';

export const {
  data: authors,
  loading: loadingAuthors,
  error: errorAuthors,
  fetchAll: fetchAuthors
} = createApiStore<Author>('authors');