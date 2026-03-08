import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLibrary } from '@/context/LibraryContext';
import { BookOpen, LayoutDashboard, Library, PlusCircle, User, LogOut, BookCopy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/books', label: 'Books', icon: Library },
  { to: '/books/add', label: 'Add Book', icon: PlusCircle, adminOnly: true },
  { to: '/borrow', label: 'Borrow', icon: BookCopy },
  { to: '/profile', label: 'Profile', icon: User },
];

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { currentUser, logout } = useLibrary();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
            <BookOpen className="h-6 w-6" />
            <span className="hidden sm:inline">Library MS</span>
          </Link>
          <nav className="flex items-center gap-1">
            {navItems.map(item => {
              if (item.adminOnly && currentUser?.role !== 'admin') return null;
              const active = location.pathname === item.to;
              return (
                <Link key={item.to} to={item.to}>
                  <Button
                    variant={active ? 'default' : 'ghost'}
                    size="sm"
                    className="gap-2 text-sm"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="hidden md:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-destructive hover:text-destructive">
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-8">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
