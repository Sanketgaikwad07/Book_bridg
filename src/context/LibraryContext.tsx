import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Book, BorrowRecord } from '@/types/library';

interface LibraryContextType {
  currentUser: User | null;
  users: User[];
  books: Book[];
  records: BorrowRecord[];
  login: (email: string, password: string) => User | null;
  register: (user: Omit<User, 'id' | 'createdAt'>) => boolean;
  logout: () => void;
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  borrowBook: (bookId: string) => boolean;
  returnBook: (recordId: string) => boolean;
  checkOverdue: () => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

const SEED_BOOKS: Book[] = [
  { id: 'b1', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', isbn: '978-0-06-112008-4', quantity: 5, available: 3 },
  { id: 'b2', title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', isbn: '978-0-553-10953-5', quantity: 3, available: 2 },
  { id: 'b3', title: '1984', author: 'George Orwell', category: 'Fiction', isbn: '978-0-451-52493-5', quantity: 4, available: 4 },
  { id: 'b4', title: 'The Art of War', author: 'Sun Tzu', category: 'Philosophy', isbn: '978-1-59030-225-9', quantity: 2, available: 1 },
  { id: 'b5', title: 'Clean Code', author: 'Robert C. Martin', category: 'Technology', isbn: '978-0-13-235088-4', quantity: 6, available: 5 },
  { id: 'b6', title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History', isbn: '978-0-06-231609-7', quantity: 3, available: 3 },
  { id: 'b7', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Literature', isbn: '978-0-7432-7356-5', quantity: 4, available: 2 },
  { id: 'b8', title: 'Calculus Made Easy', author: 'Silvanus P. Thompson', category: 'Mathematics', isbn: '978-0-312-18548-0', quantity: 3, available: 3 },
];

const SEED_USERS: User[] = [
  { id: 'u1', name: 'Admin User', email: 'admin@library.com', password: 'admin123', role: 'admin', createdAt: '2024-01-01' },
];

function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => load('lms_currentUser', null));
  const [users, setUsers] = useState<User[]>(() => load('lms_users', SEED_USERS));
  const [books, setBooks] = useState<Book[]>(() => load('lms_books', SEED_BOOKS));
  const [records, setRecords] = useState<BorrowRecord[]>(() => load('lms_records', []));

  useEffect(() => { localStorage.setItem('lms_currentUser', JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { localStorage.setItem('lms_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('lms_books', JSON.stringify(books)); }, [books]);
  useEffect(() => { localStorage.setItem('lms_records', JSON.stringify(records)); }, [records]);

  // Check for overdue books on mount and when records change
  const checkOverdue = () => {
    const today = new Date().toISOString().split('T')[0];
    setRecords(prev => prev.map(r => {
      if (r.status === 'Borrowed' && r.expectedReturnDate && r.expectedReturnDate < today) {
        return { ...r, status: 'Overdue' as const };
      }
      return r;
    }));
  };

  useEffect(() => { checkOverdue(); }, []);

  const login = (email: string, password: string): User | null => {
    const u = users.find(u => u.email === email && u.password === password);
    if (u) setCurrentUser(u);
    return u || null;
  };

  const register = (data: Omit<User, 'id' | 'createdAt'>): boolean => {
    if (users.some(u => u.email === data.email)) return false;
    const newUser: User = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString().split('T')[0] };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => setCurrentUser(null);

  const addBook = (book: Omit<Book, 'id'>) => {
    setBooks(prev => [...prev, { ...book, id: crypto.randomUUID() }]);
  };

  const updateBook = (id: string, data: Partial<Book>) => {
    setBooks(prev => prev.map(b => b.id === id ? { ...b, ...data } : b));
  };

  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(b => b.id !== id));
  };

  const borrowBook = (bookId: string): boolean => {
    const book = books.find(b => b.id === bookId);
    if (!book || book.available <= 0 || !currentUser) return false;
    updateBook(bookId, { available: book.available - 1 });
    
    // Expected return date is 14 days from now
    const expectedReturn = new Date();
    expectedReturn.setDate(expectedReturn.getDate() + 14);
    
    setRecords(prev => [...prev, {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      bookId,
      borrowDate: new Date().toISOString().split('T')[0],
      expectedReturnDate: expectedReturn.toISOString().split('T')[0],
      returnDate: null,
      status: 'Borrowed',
    }]);
    return true;
  };

  const returnBook = (recordId: string): boolean => {
    const record = records.find(r => r.id === recordId);
    if (!record || record.status === 'Returned') return false;
    const book = books.find(b => b.id === record.bookId);
    if (book) updateBook(book.id, { available: book.available + 1 });
    setRecords(prev => prev.map(r => r.id === recordId ? { ...r, status: 'Returned', returnDate: new Date().toISOString().split('T')[0] } : r));
    return true;
  };

  return (
    <LibraryContext.Provider value={{ currentUser, users, books, records, login, register, logout, addBook, updateBook, deleteBook, borrowBook, returnBook, checkOverdue }}>
      {children}
    </LibraryContext.Provider>
  );
}

export const useLibrary = () => {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error('useLibrary must be used within LibraryProvider');
  return ctx;
};
