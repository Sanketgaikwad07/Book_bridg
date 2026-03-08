import { useLibrary } from '@/context/LibraryContext';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, AlertTriangle } from 'lucide-react';

const statusStyles = {
  Returned: 'bg-success/15 text-success border-success/30',
  Borrowed: 'bg-warning/15 text-warning border-warning/30',
  Overdue: 'bg-destructive/15 text-destructive border-destructive/30',
};

const BorrowRecordsPage = () => {
  const { records, books, users } = useLibrary();

  const allRecords = [...records].reverse();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">Borrow Records</h1>
            <p className="text-muted-foreground mt-1">Track all borrowing activity</p>
          </div>
        </div>

        {allRecords.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground text-lg">No borrow records yet.</p>
              <p className="text-muted-foreground text-sm mt-1">Records will appear here when books are borrowed.</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-md">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Student Name</TableHead>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Borrow Date</TableHead>
                    <TableHead>Expected Return</TableHead>
                    <TableHead>Return Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allRecords.map(r => {
                    const book = books.find(b => b.id === r.bookId);
                    const user = users.find(u => u.id === r.userId);
                    return (
                      <TableRow key={r.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium">{user?.name || 'Unknown'}</TableCell>
                        <TableCell>{book?.title || 'Unknown'}</TableCell>
                        <TableCell className="text-muted-foreground">{r.borrowDate}</TableCell>
                        <TableCell className="text-muted-foreground">{r.expectedReturnDate}</TableCell>
                        <TableCell className="text-muted-foreground">{r.returnDate || '—'}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border ${statusStyles[r.status]}`}>
                            {r.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default BorrowRecordsPage;
