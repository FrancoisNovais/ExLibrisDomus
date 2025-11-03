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
  id_shelf?: number;
  // Données imbriquées via include
  author?: Author;
  genre?: Genre;
  shelf?: Shelf;
  notes?: Note[];
  borrows?: Borrow[];
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

export interface Shelf {
  id: number;
  label: string;
}

export interface Note {
  id: number;
  page: number;
  content: string;
  id_book: number;
}

export interface Borrow {
  id: number;
  status: 'ongoing' | 'returned';
  borrow_date: string;
  return_date: string | null;
  id_book: number;
  id_borrower: number;
  borrower?: Borrower;
}

export interface Borrower {
  id: number;
  email: string;
  last_name: string;
  first_name?: string | null;
  phone?: string | null;
}