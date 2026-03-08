import { useLibrary } from '@/context/LibraryContext';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, BookCopy, CheckCircle } from 'lucide-react';

const DashboardPage = () => {
  const { books, users, records } = useLibrary();

  const totalBooks = books.reduce((a, b) => a + b.quantity, 0);
  const availableBooks = books.reduce((a, b) => a + b.available, 0);
  const borrowedBooks = records.filter(r => r.status === 'Borrowed').length;

  const stats = [
    { label: 'Total Books', value: totalBooks, icon: BookOpen, color: 'text-primary' },
    { label: 'Total Users', value: users.length, icon: Users, color: 'text-accent' },
    { label: 'Borrowed', value: borrowedBooks, icon: BookCopy, color: 'text-warning' },
    { label: 'Available', value: availableBooks, icon: CheckCircle, color: 'text-success' },
  ];

  const recentRecords = [...records].reverse().slice(0, 5);

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of library statistics</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(s => (
            <Card key={s.label} className="stat-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`rounded-xl bg-muted p-3 ${s.color}`}>
                  <s.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-3xl font-bold font-display">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="font-display text-xl font-semibold mb-4">Recent Activity</h2>
            {recentRecords.length === 0 ? (
              <p className="text-muted-foreground text-sm">No borrowing activity yet.</p>
            ) : (
              <div className="space-y-3">
                {recentRecords.map(r => {
                  const book = books.find(b => b.id === r.bookId);
                  return (
                    <div key={r.id} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                      <div>
                        <p className="font-medium">{book?.title || 'Unknown Book'}</p>
                        <p className="text-sm text-muted-foreground">{r.borrowDate}</p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${r.status === 'Borrowed' ? 'bg-warning/15 text-warning' : 'bg-success/15 text-success'}`}>
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
