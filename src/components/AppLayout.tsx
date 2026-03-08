import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLibrary } from '@/context/LibraryContext';
import { BookOpen, LayoutDashboard, Library, PlusCircle, User, LogOut, BookCopy, FileText, CalendarDays, Newspaper, MessageCircle, HelpCircle, BookMarked, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const navItems = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/books', label: 'Books', icon: Library },
  { to: '/borrow', label: 'My Borrow', icon: BookCopy },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/records', label: 'History', icon: FileText },
  { to: '/articles', label: 'Articles', icon: BookMarked },
  { to: '/news', label: 'News', icon: Newspaper },
  { to: '/chat', label: 'Chat', icon: MessageCircle },
  { to: '/support', label: 'Support', icon: HelpCircle },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/books/add', label: 'Add Book', icon: PlusCircle, adminOnly: true },
];

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { currentUser, logout } = useLibrary();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Black Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[hsl(222,47%,5%)] border-b border-white/10 shadow-lg">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2.5 group shrink-0">
            <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-1.5 transition-transform group-hover:scale-110">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold text-white">
              Book<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Bridge</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map(item => {
              if (item.adminOnly && currentUser?.role !== 'admin') return null;
              const active = location.pathname === item.to;
              return (
                <Link key={item.to} to={item.to}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`gap-1.5 text-xs font-medium transition-all duration-200 ${
                      active
                        ? 'bg-white/15 text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            <div className="w-px h-5 bg-white/20 mx-1" />
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10">
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <Button variant="ghost" size="sm" className="lg:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[hsl(222,47%,5%)] animate-fade-in">
            <div className="container py-3 grid grid-cols-3 gap-1">
              {navItems.map(item => {
                if (item.adminOnly && currentUser?.role !== 'admin') return null;
                const active = location.pathname === item.to;
                return (
                  <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full gap-1.5 text-xs justify-start ${
                        active ? 'bg-white/15 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <item.icon className="h-3.5 w-3.5" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 justify-start">
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1 container py-8 animate-fade-in">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
