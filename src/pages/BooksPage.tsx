import { useState } from 'react';
import { useLibrary } from '@/context/LibraryContext';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Trash2, Edit, BookOpen } from 'lucide-react';
import { CATEGORIES } from '@/types/library';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const ITEMS_PER_PAGE = 6;

const BooksPage = () => {
  const { books, currentUser, deleteBook, updateBook, borrowBook } = useLibrary();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [editingBook, setEditingBook] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', author: '', category: '', isbn: '', quantity: 0 });

  const filtered = books.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'all' || b.category === category;
    return matchSearch && matchCat;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const isAdmin = currentUser?.role === 'admin';

  const handleDelete = (id: string) => {
    deleteBook(id);
    toast.success('Book deleted');
  };

  const openEdit = (bookId: string) => {
    const b = books.find(x => x.id === bookId);
    if (b) {
      setEditForm({ title: b.title, author: b.author, category: b.category, isbn: b.isbn, quantity: b.quantity });
      setEditingBook(bookId);
    }
  };

  const handleEdit = () => {
    if (editingBook) {
      updateBook(editingBook, { ...editForm, available: editForm.quantity });
      toast.success('Book updated');
      setEditingBook(null);
    }
  };

  const handleBorrow = (bookId: string) => {
    if (!currentUser) { toast.error('Please login first'); return; }
    const ok = borrowBook(bookId);
    if (ok) toast.success('Book borrowed successfully!');
    else toast.error('Book not available');
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">Books</h1>
            <p className="text-muted-foreground mt-1">{filtered.length} books found</p>
          </div>
          {isAdmin && (
            <Link to="/books/add">
              <Button>+ Add Book</Button>
            </Link>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by title or author..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="pl-10" />
          </div>
          <Select value={category} onValueChange={v => { setCategory(v); setPage(1); }}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map(book => (
            <Card key={book.id} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg leading-tight">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-secondary px-2 py-1 rounded-full text-secondary-foreground">{book.category}</span>
                  <span className="bg-muted px-2 py-1 rounded-full text-muted-foreground">ISBN: {book.isbn}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="text-sm">
                    <span className={book.available > 0 ? 'text-success font-medium' : 'text-destructive font-medium'}>
                      {book.available > 0 ? `${book.available} available` : 'Unavailable'}
                    </span>
                    <span className="text-muted-foreground"> / {book.quantity} total</span>
                  </div>
                  <div className="flex gap-1">
                    {currentUser && book.available > 0 && (
                      <Button size="sm" variant="outline" onClick={() => handleBorrow(book.id)}>Borrow</Button>
                    )}
                    {isAdmin && (
                      <>
                        <Button size="sm" variant="ghost" onClick={() => openEdit(book.id)}><Edit className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(book.id)}><Trash2 className="h-4 w-4" /></Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No books found matching your search.</div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 pt-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button key={i} size="sm" variant={page === i + 1 ? 'default' : 'outline'} onClick={() => setPage(i + 1)}>
                {i + 1}
              </Button>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!editingBook} onOpenChange={() => setEditingBook(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle className="font-display">Edit Book</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Title</Label><Input value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} /></div>
            <div className="space-y-2"><Label>Author</Label><Input value={editForm.author} onChange={e => setEditForm({ ...editForm, author: e.target.value })} /></div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={editForm.category} onValueChange={v => setEditForm({ ...editForm, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>ISBN</Label><Input value={editForm.isbn} onChange={e => setEditForm({ ...editForm, isbn: e.target.value })} /></div>
            <div className="space-y-2"><Label>Quantity</Label><Input type="number" value={editForm.quantity} onChange={e => setEditForm({ ...editForm, quantity: Number(e.target.value) })} /></div>
            <Button onClick={handleEdit} className="w-full">Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default BooksPage;
