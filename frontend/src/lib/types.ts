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

export interface Author {
  id: number;
  first_name?: string;
  last_name: string;
  birth_date?: string;
}

export interface Genre {
  id: number;
  category: string;
}
