import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibrary } from '@/context/LibraryContext';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CATEGORIES } from '@/types/library';
import { toast } from 'sonner';
import { BookOpen } from 'lucide-react';

const AddBookPage = () => {
  const { addBook } = useLibrary();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', author: '', category: CATEGORIES[0], isbn: '', quantity: 1 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBook({ ...form, available: form.quantity });
    toast.success('📚 Book added successfully!');
    navigate('/books');
  };

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto">
        <Card className="shadow-xl border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-primary to-accent p-2.5">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="font-display text-2xl">Add New Book</CardTitle>
                <CardDescription>Add a book to the BookBridge collection</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2"><Label>Title</Label><Input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Book title" className="h-11" /></div>
              <div className="space-y-2"><Label>Author</Label><Input required value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} placeholder="Author name" className="h-11" /></div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
                  <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>ISBN</Label><Input required value={form.isbn} onChange={e => setForm({ ...form, isbn: e.target.value })} placeholder="978-X-XXX-XXXXX-X" className="h-11" /></div>
              <div className="space-y-2"><Label>Quantity</Label><Input type="number" min={1} required value={form.quantity} onChange={e => setForm({ ...form, quantity: Number(e.target.value) })} className="h-11" /></div>
              <Button type="submit" className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:opacity-90" size="lg">Add Book</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AddBookPage;
