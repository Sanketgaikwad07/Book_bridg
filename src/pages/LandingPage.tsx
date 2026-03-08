import { Link, useNavigate } from 'react-router-dom';
import heroImage from '@/assets/library-hero.jpg';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <img
        src={heroImage}
        alt="Library interior"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="animate-fade-up">
          <BookOpen className="mx-auto mb-6 h-16 w-16 text-accent" />
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-primary-foreground mb-4">
            LIBRARY MANAGEMENT<br />SYSTEM
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-primary-foreground/80 mb-10 font-body font-light">
            Manage books, students, and borrowing records efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 px-8 text-base font-semibold transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/books')}
            >
              Explore Library
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
