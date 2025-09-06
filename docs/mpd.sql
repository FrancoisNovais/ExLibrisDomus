-- =============================================
-- POSTGRESQL SQL SCRIPT - ExLibrisDomus
-- =============================================

-- Drop tables if they exist
DROP TABLE IF EXISTS borrow CASCADE;
DROP TABLE IF EXISTS note CASCADE;
DROP TABLE IF EXISTS book CASCADE;
DROP TABLE IF EXISTS author CASCADE;
DROP TABLE IF EXISTS shelf CASCADE;
DROP TABLE IF EXISTS borrower CASCADE;
DROP TABLE IF EXISTS genre CASCADE;

-- =============================================
-- TABLE CREATION
-- =============================================

-- Table Author
CREATE TABLE "author" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT,
    "birth_date" DATE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ 
);

-- Table Shelf
CREATE TABLE "shelf" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ 
);

-- Table Genre
CREATE TABLE "genre" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "category" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ 
);

-- Table Borrower
CREATE TABLE "borrower" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT,
    "phone" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ 
);

-- Table Book
CREATE TABLE "book" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "year" INTEGER,
    "pages" INTEGER,
    "language" TEXT,
    "rating" INT CHECK (rating BETWEEN 1 AND 5),
    "cover" TEXT, -- URL or path to the image
    "favorite" BOOLEAN DEFAULT FALSE,
    "synopsis" TEXT,
    "analysis" TEXT,
    "read" BOOLEAN DEFAULT FALSE,
    "id_author" INTEGER REFERENCES author(id) ON DELETE SET NULL,
    "id_shelf" INTEGER REFERENCES shelf(id) ON DELETE SET NULL,
    "id_genre" INTEGER REFERENCES genre(id) ON DELETE SET NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ 
);

-- Table Note
CREATE TABLE "note" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "page" INTEGER NOT NULL,
    "content" TEXT,
    "id_book" INTEGER NOT NULL REFERENCES book(id) ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ 
);

-- Table Borrow
CREATE TABLE "borrow" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "status" TEXT NOT NULL CHECK (status IN ('ongoing', 'returned', 'late')),
    "borrow_date" DATE NOT NULL,
    "return_date" DATE,
    "id_book" INTEGER NOT NULL REFERENCES book(id) ON DELETE RESTRICT,
    "id_borrower" INTEGER NOT NULL REFERENCES borrower(id) ON DELETE RESTRICT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ ,
    
    -- Constraint: return_date >= borrow_date if provided
    CONSTRAINT check_dates CHECK (return_date IS NULL OR return_date >= borrow_date)
);
