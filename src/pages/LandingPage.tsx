import { Link, useNavigate } from 'react-router-dom';
import heroImage from '@/assets/library-hero.jpg';
import { BookOpen, Library, Sparkles, GraduationCap, BookMarked } from 'lucide-react';
import { Button } from '@/components/ui/button';

const floatingIcons = [
  { icon: BookOpen, top: '12%', left: '8%', size: 48 },
  { icon: Library, top: '22%', right: '12%', size: 40 },
  { icon: GraduationCap, top: '60%', left: '5%', size: 44 },
  { icon: BookMarked, top: '75%', right: '8%', size: 36 },
  { icon: BookOpen, top: '40%', left: '85%', size: 52 },
  { icon: Sparkles, top: '15%', left: '75%', size: 32 },
  { icon: Library, top: '85%', left: '20%', size: 38 },
  { icon: BookMarked, top: '35%', left: '15%', size: 42 },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Library interior"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      
      {/* Gradient Overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* Floating Book Icons */}
      {floatingIcons.map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={i}
            className="floating-icon absolute text-white pointer-events-none"
            style={{ top: item.top, left: item.left, right: (item as any).right }}
          >
            <Icon size={item.size} />
          </div>
        );
      })}

      {/* Decorative Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo Badge */}
        <div className="animate-fade-up mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm font-body">
            <Sparkles className="h-4 w-4 text-amber-400" />
            Smart Library Management System
          </div>
        </div>

        {/* Title */}
        <div className="animate-fade-up">
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white mb-2">
            Book<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">Bridge</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="animate-fade-up-delay">
          <p className="max-w-lg mx-auto text-lg sm:text-xl md:text-2xl text-white/70 mb-12 font-body font-light tracking-wide">
            Smart bridge between students and books.
          </p>
        </div>

        {/* Buttons */}
        <div className="animate-fade-up-delay-2 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="glow-button bg-gradient-to-r from-primary to-accent text-white px-10 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/25"
            onClick={() => navigate('/books')}
          >
            <Library className="mr-2 h-5 w-5" />
            Enter Library
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white bg-white/5 backdrop-blur-sm hover:bg-white/15 px-10 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:border-white/50"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </div>

        {/* Bottom Stats */}
        <div className="animate-fade-up-delay-2 mt-16 grid grid-cols-3 gap-8 sm:gap-16">
          {[
            { label: 'Books', value: '100+' },
            { label: 'Categories', value: '13' },
            { label: 'CS Topics', value: 'All' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white font-display">{stat.value}</p>
              <p className="text-sm text-white/50 font-body mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/50 to-transparent" />
    </div>
  );
};

export default LandingPage;
