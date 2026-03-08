import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibrary } from '@/context/LibraryContext';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CATEGORIES } from '@/types/library';
import { toast } from 'sonner';

const AddBookPage = () => {
  const { addBook } = useLibrary();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', author: '', category: 'Fiction', isbn: '', quantity: 1 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBook({ ...form, available: form.quantity });
    toast.success('Book added successfully!');
    navigate('/books');
  };

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-display text-2xl">Add New Book</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2"><Label>Title</Label><Input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Book title" /></div>
              <div className="space-y-2"><Label>Author</Label><Input required value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} placeholder="Author name" /></div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>ISBN</Label><Input required value={form.isbn} onChange={e => setForm({ ...form, isbn: e.target.value })} placeholder="978-X-XXX-XXXXX-X" /></div>
              <div className="space-y-2"><Label>Quantity</Label><Input type="number" min={1} required value={form.quantity} onChange={e => setForm({ ...form, quantity: Number(e.target.value) })} /></div>
              <Button type="submit" className="w-full" size="lg">Add Book</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AddBookPage;
