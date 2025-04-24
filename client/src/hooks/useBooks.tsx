import React, { createContext, useContext, useEffect, useState } from "react";
import { Book, getAllBooks } from "../api";

interface BooksContext {
  books: Book[];
  setBooks: (books: Book[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const BooksContext = createContext<BooksContext>({
  books: [],
  setBooks: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

interface Props {
  children: React.ReactNode;
}
export const BooksProvider = ({ children }: Props) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchBooks = async () => {
      setTimeout(async () => {
        const availableBooks = await getAllBooks();
        setBooks(availableBooks || []);
        setIsLoading(false);
      }, 250);
    };
    if (books.length === 0) {
      fetchBooks();
    }
  }, []);

  return (
    <BooksContext.Provider value={{ books, setBooks, isLoading, setIsLoading }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  return useContext(BooksContext);
};
