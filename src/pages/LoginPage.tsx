import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLibrary } from '@/context/LibraryContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, LogIn, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useLibrary();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = login(email, password);
    if (user) {
      toast.success(`Welcome back, ${user.name}!`);
      navigate('/dashboard');
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-background px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-60 h-60 bg-primary/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-accent/5 rounded-full blur-[100px]" />
      </div>
      <Card className="w-full max-w-md animate-fade-up shadow-2xl relative border-border/50">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent p-3 w-fit shadow-lg shadow-primary/20">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="font-display text-2xl">Welcome to BookBridge</CardTitle>
          <CardDescription className="text-base">Sign in to your library account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@library.com" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" className="h-11" />
            </div>
            <Button type="submit" className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all" size="lg">
              <LogIn className="mr-2 h-4 w-4" /> Sign In
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">Register</Link>
          </p>
          <div className="mt-4 rounded-lg bg-muted/50 p-3 flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              <strong>Demo:</strong> admin@library.com / admin123 or john@student.com / student123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
