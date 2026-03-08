import { useState } from 'react';
import { useLibrary } from '@/context/LibraryContext';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { FileText, AlertTriangle, Search, Clock, CheckCircle2 } from 'lucide-react';

const statusStyles = {
  Returned: { bg: 'bg-success/15 text-success border-success/30', icon: CheckCircle2 },
  Borrowed: { bg: 'bg-warning/15 text-warning border-warning/30', icon: Clock },
  Overdue: { bg: 'bg-destructive/15 text-destructive border-destructive/30', icon: AlertTriangle },
};

const BorrowRecordsPage = () => {
  const { records, books, users } = useLibrary();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const allRecords = [...records].reverse().filter(r => {
    const book = books.find(b => b.id === r.bookId);
    const user = users.find(u => u.id === r.userId);
    const matchSearch = search === '' ||
      (book?.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (user?.name || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">Borrow Records</h1>
            <p className="text-muted-foreground mt-1">{allRecords.length} records found</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by student or book..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Borrowed">Borrowed</SelectItem>
              <SelectItem value="Returned">Returned</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {allRecords.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground text-lg">No borrow records found.</p>
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
                    const style = statusStyles[r.status];
                    const StatusIcon = style.icon;
                    return (
                      <TableRow key={r.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium">{user?.name || 'Unknown'}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{book?.title || 'Unknown'}</TableCell>
                        <TableCell className="text-muted-foreground">{r.borrowDate}</TableCell>
                        <TableCell className="text-muted-foreground">{r.expectedReturnDate}</TableCell>
                        <TableCell className="text-muted-foreground">{r.returnDate || '—'}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${style.bg}`}>
                            <StatusIcon className="h-3 w-3" />
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
