import { useState } from 'react';
import { useLibrary } from '@/context/LibraryContext';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Trash2, Edit, BookOpen, AlertTriangle, Download } from 'lucide-react';
import { CATEGORIES, getBookCoverColor } from '@/types/library';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';

const ITEMS_PER_PAGE = 12;

// Simulate some books having digital copies (every 3rd book)
const hasDigitalCopy = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash) % 3 === 0;
};

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

  const handleDelete = (id: string) => { deleteBook(id); toast.success('Book deleted successfully'); };

  const openEdit = (bookId: string) => {
    const b = books.find(x => x.id === bookId);
    if (b) { setEditForm({ title: b.title, author: b.author, category: b.category, isbn: b.isbn, quantity: b.quantity }); setEditingBook(bookId); }
  };

  const handleEdit = () => {
    if (editingBook) { updateBook(editingBook, { ...editForm, available: editForm.quantity }); toast.success('Book updated'); setEditingBook(null); }
  };

  const handleBorrow = (bookId: string) => {
    if (!currentUser) { toast.error('Please login first'); return; }
    const ok = borrowBook(bookId);
    if (ok) toast.success('📚 Book borrowed! Return within 14 days.');
    else toast.error('Not available right now');
  };

  const handleDownload = (title: string) => {
    toast.success(`📥 Downloading "${title}"... (Demo)`);
  };

  const getPageNumbers = () => {
    const pages: number[] = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">Book Collection</h1>
            <p className="text-muted-foreground mt-1">{filtered.length} of {books.length} books</p>
          </div>
          {isAdmin && (
            <Link to="/books/add">
              <Button className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90">
                <BookOpen className="h-4 w-4" /> Add Book
              </Button>
            </Link>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by title or author..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="pl-10" />
          </div>
          <Select value={category} onValueChange={v => { setCategory(v); setPage(1); }}>
            <SelectTrigger className="w-full sm:w-52"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={availability} onValueChange={v => { setAvailability(v); setPage(1); }}>
            <SelectTrigger className="w-full sm:w-44"><SelectValue placeholder="Availability" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Books</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="unavailable">Unavailable</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {paginated.map(book => (
            <Card key={book.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
              <div className={`h-32 bg-gradient-to-br ${getBookCoverColor(book.title)} flex items-end relative p-4`}>
                <BookOpen className="absolute top-3 right-3 h-8 w-8 text-white/15" />
                {hasDigitalCopy(book.id) && (
                  <span className="absolute top-3 left-3 text-[9px] bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full font-semibold">📄 PDF</span>
                )}
                <p className="text-white/90 font-display font-bold text-xs leading-tight line-clamp-2 drop-shadow-lg">{book.title}</p>
              </div>
              <CardContent className="p-4 space-y-2">
                <div>
                  <h3 className="font-display font-semibold text-sm leading-tight line-clamp-1">{book.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{book.author}</p>
                </div>
                <span className="inline-block text-[10px] bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground font-medium">{book.category}</span>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className={`text-xs font-semibold ${book.available > 0 ? 'text-success' : 'text-destructive'}`}>
                    {book.available > 0 ? `${book.available}/${book.quantity}` : 'Out'}
                  </span>
                  <div className="flex gap-1">
                    {hasDigitalCopy(book.id) && (
                      <Button size="sm" variant="ghost" onClick={() => handleDownload(book.title)} className="h-7 w-7 p-0 text-primary hover:text-primary">
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    {currentUser && book.available > 0 && (
                      <Button size="sm" variant="outline" onClick={() => handleBorrow(book.id)} className="h-7 text-xs px-2 hover:bg-primary hover:text-primary-foreground">
                        Borrow
                      </Button>
                    )}
                    {isAdmin && (
                      <>
                        <Button size="sm" variant="ghost" onClick={() => openEdit(book.id)} className="h-7 w-7 p-0"><Edit className="h-3.5 w-3.5" /></Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-destructive" />Delete Book</AlertDialogTitle>
                              <AlertDialogDescription>Delete "{book.title}"? This cannot be undone.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(book.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
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
            <p className="text-muted-foreground text-lg">No books found.</p>
            <p className="text-muted-foreground text-sm mt-1">Try adjusting your filters.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 pt-4">
            <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(1)}>First</Button>
            <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</Button>
            {getPageNumbers().map(i => (
              <Button key={i} size="sm" variant={page === i ? 'default' : 'outline'} onClick={() => setPage(i)}>{i}</Button>
            ))}
            <Button size="sm" variant="outline" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</Button>
            <Button size="sm" variant="outline" disabled={page === totalPages} onClick={() => setPage(totalPages)}>Last</Button>
            <span className="text-sm text-muted-foreground ml-2">Page {page}/{totalPages}</span>
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
            <Button onClick={handleEdit} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90">Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default BooksPage;
