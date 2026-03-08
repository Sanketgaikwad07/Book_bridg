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
  'Algorithms',
  'Data Structures',
  'Operating Systems',
  'Networking',
  'Databases',
  'Artificial Intelligence',
  'Machine Learning',
  'Software Engineering',
  'Programming',
  'Computer Architecture',
  'Theory of Computation',
  'Cybersecurity',
  'Web Development',
  'Cloud Computing',
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
    'from-teal-600 to-teal-800',
    'from-pink-600 to-pink-800',
    'from-violet-600 to-violet-800',
    'from-sky-600 to-sky-800',
    'from-lime-600 to-lime-800',
  ];
  let hash = 0;
  for (let i = 0; i < title.length; i++) hash = title.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};
