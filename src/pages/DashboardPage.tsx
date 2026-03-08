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
    { label: 'Total Books', value: totalBooks, icon: BookOpen, bgColor: 'bg-primary/10', iconColor: 'text-primary' },
    { label: 'Available Books', value: availableBooks, icon: CheckCircle, bgColor: 'bg-success/10', iconColor: 'text-success' },
    { label: 'Borrowed', value: borrowedBooks, icon: BookCopy, bgColor: 'bg-warning/10', iconColor: 'text-warning' },
    { label: 'Overdue', value: overdueBooks, icon: AlertTriangle, bgColor: 'bg-destructive/10', iconColor: 'text-destructive' },
    { label: 'Total Students', value: totalStudents, icon: Users, bgColor: 'bg-accent/10', iconColor: 'text-accent' },
    { label: 'Book Titles', value: books.length, icon: TrendingUp, bgColor: 'bg-secondary', iconColor: 'text-secondary-foreground' },
  ];

  const recentRecords = [...records].reverse().slice(0, 5);

  const statusStyles = {
    Returned: 'bg-success/15 text-success',
    Borrowed: 'bg-warning/15 text-warning',
    Overdue: 'bg-destructive/15 text-destructive',
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of library statistics</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map(s => (
            <Card key={s.label} className="stat-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`rounded-xl p-3 ${s.bgColor}`}>
                  <s.icon className={`h-6 w-6 ${s.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-3xl font-bold font-display">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <h2 className="font-display text-xl font-semibold mb-4">Recent Activity</h2>
            {recentRecords.length === 0 ? (
              <div className="text-center py-8">
                <BookCopy className="mx-auto h-12 w-12 text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground">No borrowing activity yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentRecords.map(r => {
                  const book = books.find(b => b.id === r.bookId);
                  const user = users.find(u => u.id === r.userId);
                  return (
                    <div key={r.id} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3 transition-colors hover:bg-muted/80">
                      <div>
                        <p className="font-medium">{book?.title || 'Unknown Book'}</p>
                        <p className="text-sm text-muted-foreground">by {user?.name || 'Unknown'} · {r.borrowDate}</p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[r.status]}`}>
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
