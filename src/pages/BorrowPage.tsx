import { useLibrary } from '@/context/LibraryContext';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const BorrowPage = () => {
  const { currentUser, books, records, borrowBook, returnBook } = useLibrary();

  const userRecords = records.filter(r => r.userId === currentUser?.id).reverse();

  const handleReturn = (id: string) => {
    const ok = returnBook(id);
    if (ok) toast.success('Book returned!');
    else toast.error('Could not return book');
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Borrowing History</h1>
          <p className="text-muted-foreground mt-1">Manage your borrowed books</p>
        </div>

        {userRecords.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              You haven't borrowed any books yet. Visit the <a href="/books" className="text-primary hover:underline">Books page</a> to borrow.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {userRecords.map(r => {
              const book = books.find(b => b.id === r.bookId);
              return (
                <Card key={r.id} className="transition-all duration-200 hover:shadow-md">
                  <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-lg">{book?.title || 'Unknown'}</p>
                      <p className="text-sm text-muted-foreground">{book?.author}</p>
                      <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                        <span>Borrowed: {r.borrowDate}</span>
                        {r.returnDate && <span>Returned: {r.returnDate}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${r.status === 'Borrowed' ? 'bg-warning/15 text-warning' : 'bg-success/15 text-success'}`}>
                        {r.status}
                      </span>
                      {r.status === 'Borrowed' && (
                        <Button size="sm" variant="outline" onClick={() => handleReturn(r.id)}>Return</Button>
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
