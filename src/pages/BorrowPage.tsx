import { useLibrary } from '@/context/LibraryContext';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { BookCopy, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

const statusConfig = {
  Borrowed: { icon: Clock, style: 'bg-warning/15 text-warning border-warning/30', label: 'Borrowed' },
  Returned: { icon: CheckCircle2, style: 'bg-success/15 text-success border-success/30', label: 'Returned' },
  Overdue: { icon: AlertTriangle, style: 'bg-destructive/15 text-destructive border-destructive/30', label: 'Overdue' },
};

const BorrowPage = () => {
  const { currentUser, books, records, returnBook } = useLibrary();

  const userRecords = records.filter(r => r.userId === currentUser?.id).reverse();

  const handleReturn = (id: string) => {
    const ok = returnBook(id);
    if (ok) toast.success('✅ Book returned successfully!');
    else toast.error('Could not return book');
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <BookCopy className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">My Borrowing History</h1>
            <p className="text-muted-foreground mt-1">Manage your borrowed books</p>
          </div>
        </div>

        {userRecords.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <BookCopy className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-lg">You haven't borrowed any books yet.</p>
              <p className="text-muted-foreground text-sm mt-1">
                Visit the <a href="/books" className="text-primary hover:underline font-medium">Books page</a> to browse and borrow.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {userRecords.map(r => {
              const book = books.find(b => b.id === r.bookId);
              const config = statusConfig[r.status];
              const StatusIcon = config.icon;
              return (
                <Card key={r.id} className="transition-all duration-200 hover:shadow-md">
                  <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-display font-semibold text-lg">{book?.title || 'Unknown'}</p>
                      <p className="text-sm text-muted-foreground">{book?.author}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                        <span>📅 Borrowed: {r.borrowDate}</span>
                        <span>⏳ Due: {r.expectedReturnDate}</span>
                        {r.returnDate && <span>✅ Returned: {r.returnDate}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${config.style}`}>
                        <StatusIcon className="h-3.5 w-3.5" />
                        {config.label}
                      </span>
                      {(r.status === 'Borrowed' || r.status === 'Overdue') && (
                        <Button size="sm" variant="outline" onClick={() => handleReturn(r.id)} className="transition-all hover:bg-success hover:text-success-foreground hover:border-success">
                          Return
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default BorrowPage;
