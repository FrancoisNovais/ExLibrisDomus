import { createApiStore } from '$lib/stores/createApiStore.svelte';
import type { Genre } from '$lib/types';

export const {
  data: genres,
  loading: loadingGenres,
  error: errorGenres,
  fetchAll: fetchGenres
} = createApiStore<Genre>('genres');