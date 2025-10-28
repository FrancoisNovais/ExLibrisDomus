// Types globaux du projet

export interface Book {
  id: number;
  title: string;
  year: number;
  pages: number;
  language?: string;
  rating?: number;
  cover?: string | null;
  favorite: boolean;
  synopsis?: string;
  analysis?: string;
  read: boolean;
  id_author: number;
  id_genre: number;
}