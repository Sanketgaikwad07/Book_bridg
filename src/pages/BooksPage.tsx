import { useState } from 'react';
import { useLibrary } from '@/context/LibraryContext';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Trash2, Edit, BookOpen, AlertTriangle } from 'lucide-react';
import { CATEGORIES, getBookCoverColor } from '@/types/library';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';

const ITEMS_PER_PAGE = 6;

const BooksPage = () => {
  const { books, currentUser, deleteBook, updateBook, borrowBook } = useLibrary();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [availability, setAvailability] = useState('all');
  const [page, setPage] = useState(1);
  const [editingBook, setEditingBook] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', author: '', category: '', isbn: '', quantity: 0 });

  const filtered = books.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'all' || b.category === category;
    const matchAvail = availability === 'all' || (availability === 'available' ? b.available > 0 : b.available === 0);
    return matchSearch && matchCat && matchAvail;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const isAdmin = currentUser?.role === 'admin';

  const handleDelete = (id: string) => {
    deleteBook(id);
    toast.success('Book deleted successfully');
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
      toast.success('Book updated successfully');
      setEditingBook(null);
    }
  };

  const handleBorrow = (bookId: string) => {
    if (!currentUser) { toast.error('Please login first'); return; }
    const ok = borrowBook(bookId);
    if (ok) toast.success('📚 Book borrowed successfully! Return within 14 days.');
    else toast.error('This book is not available right now');
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
              <Button className="gap-2">
                <BookOpen className="h-4 w-4" />
                Add Book
              </Button>
            </Link>
          )}
        </div>

        {/* Search and Filters */}
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
          <Select value={availability} onValueChange={v => { setAvailability(v); setPage(1); }}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Books</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="unavailable">Unavailable</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map(book => (
            <Card key={book.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
              {/* Book Cover */}
              <div className={`h-32 bg-gradient-to-br ${getBookCoverColor(book.title)} flex items-center justify-center relative`}>
                <BookOpen className="h-12 w-12 text-white/30" />
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-white font-display font-bold text-sm truncate drop-shadow-lg">{book.title}</p>
                </div>
              </div>
              <CardContent className="p-5 space-y-3">
                <div>
                  <h3 className="font-display font-semibold text-lg leading-tight">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{book.author}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-secondary px-2.5 py-1 rounded-full text-secondary-foreground font-medium">{book.category}</span>
                  <span className="bg-muted px-2.5 py-1 rounded-full text-muted-foreground">ISBN: {book.isbn}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="text-sm">
                    <span className={book.available > 0 ? 'text-success font-semibold' : 'text-destructive font-semibold'}>
                      {book.available > 0 ? `${book.available} available` : 'Unavailable'}
                    </span>
                    <span className="text-muted-foreground"> / {book.quantity}</span>
                  </div>
                  <div className="flex gap-1">
                    {currentUser && book.available > 0 && (
                      <Button size="sm" variant="outline" onClick={() => handleBorrow(book.id)} className="transition-all hover:bg-primary hover:text-primary-foreground">
                        Borrow
                      </Button>
                    )}
                    {isAdmin && (
                      <>
                        <Button size="sm" variant="ghost" onClick={() => openEdit(book.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-destructive" />
                                Delete Book
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{book.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(book.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-lg">No books found matching your search.</p>
            <p className="text-muted-foreground text-sm mt-1">Try adjusting your filters or search term.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 pt-4">
            <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button key={i} size="sm" variant={page === i + 1 ? 'default' : 'outline'} onClick={() => setPage(i + 1)}>
                {i + 1}
              </Button>
            ))}
            <Button size="sm" variant="outline" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
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
