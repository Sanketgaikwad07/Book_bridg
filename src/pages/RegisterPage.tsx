import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLibrary } from '@/context/LibraryContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { UserRole } from '@/types/library';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const { register } = useLibrary();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    const ok = register({ name, email, password, role });
    if (ok) {
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } else {
      toast.error('Email already registered');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-background px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/3 -left-20 w-72 h-72 bg-accent/5 rounded-full blur-[100px]" />
      </div>
      <Card className="w-full max-w-md animate-fade-up shadow-2xl relative border-border/50">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent p-3 w-fit shadow-lg shadow-primary/20">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="font-display text-2xl">Join BookBridge</CardTitle>
          <CardDescription className="text-base">Create your library account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} required placeholder="John Doe" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="john@example.com" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Min 6 characters" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all" size="lg">
              <UserPlus className="mr-2 h-4 w-4" /> Create Account
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
