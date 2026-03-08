export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  quantity: number;
  available: number;
  coverColor?: string;
}

export interface BorrowRecord {
  id: string;
  userId: string;
  bookId: string;
  borrowDate: string;
  expectedReturnDate: string;
  returnDate: string | null;
  status: 'Borrowed' | 'Returned' | 'Overdue';
}

export const CATEGORIES = [
  'Fiction',
  'Non-Fiction',
  'Science',
  'Technology',
  'History',
  'Philosophy',
  'Mathematics',
  'Literature',
  'Art',
  'Biography',
];

// Generate a consistent cover color from book title
export const getBookCoverColor = (title: string): string => {
  const colors = [
    'from-blue-600 to-blue-800',
    'from-emerald-600 to-emerald-800',
    'from-purple-600 to-purple-800',
    'from-amber-600 to-amber-800',
    'from-rose-600 to-rose-800',
    'from-cyan-600 to-cyan-800',
    'from-indigo-600 to-indigo-800',
    'from-orange-600 to-orange-800',
  ];
  let hash = 0;
  for (let i = 0; i < title.length; i++) hash = title.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};
