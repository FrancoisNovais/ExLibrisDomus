import { createApiStore } from '$lib/stores/createApiStore.svelte';
import type { Shelf } from '$lib/types';

export const {
  data: shelves,
  loading: loadingShelves,
  error: errorShelves,
  fetchAll: fetchShelves
} = createApiStore<Shelf>('shelves');