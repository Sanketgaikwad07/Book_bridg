import { useLibrary } from '@/context/LibraryContext';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, BookCopy, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';

const DashboardPage = () => {
  const { books, users, records } = useLibrary();

  const totalBooks = books.reduce((a, b) => a + b.quantity, 0);
  const availableBooks = books.reduce((a, b) => a + b.available, 0);
  const borrowedBooks = records.filter(r => r.status === 'Borrowed').length;
  const overdueBooks = records.filter(r => r.status === 'Overdue').length;
  const totalStudents = users.filter(u => u.role === 'student').length;

  const stats = [
    { label: 'Total Books', value: totalBooks, icon: BookOpen, gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', text: 'text-blue-600' },
    { label: 'Available', value: availableBooks, icon: CheckCircle, gradient: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { label: 'Borrowed', value: borrowedBooks, icon: BookCopy, gradient: 'from-amber-500 to-amber-600', bg: 'bg-amber-50', text: 'text-amber-600' },
    { label: 'Overdue', value: overdueBooks, icon: AlertTriangle, gradient: 'from-rose-500 to-rose-600', bg: 'bg-rose-50', text: 'text-rose-600' },
    { label: 'Students', value: totalStudents, icon: Users, gradient: 'from-purple-500 to-purple-600', bg: 'bg-purple-50', text: 'text-purple-600' },
    { label: 'Book Titles', value: books.length, icon: TrendingUp, gradient: 'from-cyan-500 to-cyan-600', bg: 'bg-cyan-50', text: 'text-cyan-600' },
  ];

  const recentRecords = [...records].reverse().slice(0, 6);

  const statusStyles = {
    Returned: 'bg-success/15 text-success border-success/30',
    Borrowed: 'bg-warning/15 text-warning border-warning/30',
    Overdue: 'bg-destructive/15 text-destructive border-destructive/30',
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to BookBridge — your library overview</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s, i) => (
            <Card key={s.label} className="stat-card overflow-hidden" style={{ animationDelay: `${i * 0.05}s` }}>
              <CardContent className="p-5">
                <div className={`rounded-xl p-2.5 w-fit ${s.bg} mb-3`}>
                  <s.icon className={`h-5 w-5 ${s.text}`} />
                </div>
                <p className="text-3xl font-bold font-display">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <h2 className="font-display text-xl font-semibold mb-5">Recent Activity</h2>
            {recentRecords.length === 0 ? (
              <div className="text-center py-10">
                <BookCopy className="mx-auto h-12 w-12 text-muted-foreground/20 mb-3" />
                <p className="text-muted-foreground">No borrowing activity yet.</p>
                <p className="text-muted-foreground text-sm mt-1">Start by borrowing a book from the library.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentRecords.map(r => {
                  const book = books.find(b => b.id === r.bookId);
                  const user = users.find(u => u.id === r.userId);
                  return (
                    <div key={r.id} className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3.5 transition-all duration-200 hover:bg-muted/80 hover:shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{book?.title || 'Unknown Book'}</p>
                          <p className="text-xs text-muted-foreground">{user?.name || 'Unknown'} · {r.borrowDate}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusStyles[r.status]}`}>
                        {r.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
