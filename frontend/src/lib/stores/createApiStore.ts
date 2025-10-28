import { writable, type Writable } from 'svelte/store';
import axios from 'axios';

/**
 * Interface d'un store API générique
 * @template T - Le type de données stockées (ex: Book, Author, Genre)
 */
export interface ApiStore<T> {
  data: Writable<T[]>;
  loading: Writable<boolean>;
  error: Writable<string | null>;
  fetchAll: () => Promise<void>;
}

/**
 * Factory function qui crée un store générique pour gérer une ressource API
 * 
 * UTILISATION :
 * 
 * 1. Créer un store dédié (dans stores/authors.ts) :
 * ```typescript
 * export const {
 *   data: authors,
 *   loading: loadingAuthors,
 *   error: errorAuthors,
 *   fetchAll: fetchAuthors
 * } = createApiStore<Author>('authors');
 * ```
 * 
 * 2. Utiliser dans un composant :
 * ```svelte
 * onMount(async () => {
 *   await Promise.all([fetchAuthors(), fetchGenres()]);
 * });
 * ```
 * 
 * @template T - Le type de données (ex: Book, Author, Genre)
 * @param {string} endpoint - Le nom de l'endpoint API (ex: 'books', 'authors')
 * @returns {ApiStore<T>} Un objet contenant les stores et la fonction fetchAll
 */
export function createApiStore<T>(endpoint: string): ApiStore<T> {
  const data = writable<T[]>([]);
  const loading = writable<boolean>(false);
  const error = writable<string | null>(null);

  async function fetchAll() {
    loading.set(true);
    error.set(null);

    try {
      const res = await axios.get(`http://localhost:4000/api/${endpoint}`, {
        headers: { Accept: 'application/json' },
      });
      data.set(res.data);
    } catch (err: any) {
      error.set(err.message || `Failed to fetch ${endpoint}`);
    } finally {
      loading.set(false);
    }
  }

  return { data, loading, error, fetchAll };
}