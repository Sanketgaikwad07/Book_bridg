import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLibrary } from '@/context/LibraryContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, LogIn } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md animate-fade-up shadow-xl">
        <CardHeader className="text-center">
          <BookOpen className="mx-auto h-10 w-10 text-primary mb-2" />
          <CardTitle className="font-display text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your library account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@library.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full" size="lg">
              <LogIn className="mr-2 h-4 w-4" /> Sign In
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">Register</Link>
          </p>
          <p className="text-center text-xs text-muted-foreground mt-2">
            Demo: admin@library.com / admin123
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
