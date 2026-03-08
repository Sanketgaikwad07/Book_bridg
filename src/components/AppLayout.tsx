import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLibrary } from '@/context/LibraryContext';
import { BookOpen, LayoutDashboard, Library, PlusCircle, User, LogOut, BookCopy, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/books', label: 'Books', icon: Library },
  { to: '/books/add', label: 'Add Book', icon: PlusCircle, adminOnly: true },
  { to: '/borrow', label: 'My Borrows', icon: BookCopy },
  { to: '/records', label: 'Records', icon: FileText, adminOnly: true },
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
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="rounded-lg bg-gradient-to-br from-primary to-accent p-1.5 transition-transform group-hover:scale-110">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="hidden sm:inline font-display text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BookBridge
            </span>
          </Link>
          <nav className="flex items-center gap-0.5">
            {navItems.map(item => {
              if (item.adminOnly && currentUser?.role !== 'admin') return null;
              const active = location.pathname === item.to;
              return (
                <Link key={item.to} to={item.to}>
                  <Button
                    variant={active ? 'default' : 'ghost'}
                    size="sm"
                    className={`gap-2 text-sm transition-all duration-200 ${active ? 'shadow-md' : 'hover:bg-muted'}`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
            <div className="w-px h-6 bg-border mx-1" />
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="h-4 w-4" />
              <span className="hidden lg:inline">Logout</span>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-8 animate-fade-in">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
