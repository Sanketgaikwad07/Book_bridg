import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/library-hero.jpg';
import { BookOpen, Library, Sparkles, GraduationCap, BookMarked, ArrowRight, Star, Users, Clock, MessageCircle, Newspaper, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLibrary } from '@/context/LibraryContext';

const floatingIcons = [
  { icon: BookOpen, top: '10%', left: '6%', size: 48 },
  { icon: Library, top: '20%', right: '10%', size: 40 },
  { icon: GraduationCap, top: '55%', left: '4%', size: 44 },
  { icon: BookMarked, top: '70%', right: '6%', size: 36 },
  { icon: BookOpen, top: '38%', left: '88%', size: 52 },
  { icon: Sparkles, top: '12%', left: '78%', size: 32 },
  { icon: Library, top: '82%', left: '18%', size: 38 },
  { icon: BookMarked, top: '30%', left: '12%', size: 42 },
];

const FEATURED_ARTICLES = [
  { title: 'Understanding Big-O Notation', desc: 'A beginner-friendly guide to algorithm complexity analysis.', category: 'Algorithms' },
  { title: 'Introduction to Neural Networks', desc: 'Learn the building blocks of deep learning from scratch.', category: 'AI' },
  { title: 'Database Normalization Explained', desc: 'Master the art of designing efficient relational databases.', category: 'Databases' },
  { title: 'TCP/IP Protocol Deep Dive', desc: 'Understand how the internet works at a fundamental level.', category: 'Networking' },
];

const NEWS_ITEMS = [
  { title: '50 New AI Books Added', date: 'Mar 5, 2026', tag: 'New Books' },
  { title: 'Extended Library Hours This Month', date: 'Mar 3, 2026', tag: 'Announcement' },
  { title: 'Reading Challenge: Spring 2026', date: 'Mar 1, 2026', tag: 'Event' },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { books } = useLibrary();
  const featuredBooks = books.slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <img src={heroImage} alt="Library" className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="hero-overlay absolute inset-0" />

        {floatingIcons.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="floating-icon absolute text-white pointer-events-none" style={{ top: item.top, left: item.left, right: (item as any).right }}>
              <Icon size={item.size} />
            </div>
          );
        })}

        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-purple-500/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Top Navbar */}
        <nav className="absolute top-0 left-0 right-0 z-20 bg-black/40 backdrop-blur-sm border-b border-white/10">
          <div className="container flex h-14 items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-1.5">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-white">Book<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Bridge</span></span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10" onClick={() => navigate('/login')}>Login</Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90" onClick={() => navigate('/register')}>Get Started</Button>
            </div>
          </div>
        </nav>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <div className="animate-fade-up mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm">
              <Sparkles className="h-4 w-4 text-amber-400" />
              Smart Library Management System
            </div>
          </div>

          <div className="animate-fade-up">
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white mb-2">
              Book<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">Bridge</span>
            </h1>
          </div>

          <div className="animate-fade-up-delay">
            <p className="max-w-lg mx-auto text-lg sm:text-xl md:text-2xl text-white/60 mb-12 font-light tracking-wide">
              A smart bridge between students and books.
            </p>
          </div>

          <div className="animate-fade-up-delay-2 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="glow-button bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg" onClick={() => navigate('/books')}>
              <Library className="mr-2 h-5 w-5" />
              Enter Library
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white bg-white/5 backdrop-blur-sm hover:bg-white/15 px-10 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105" onClick={() => navigate('/login')}>
              Login
            </Button>
          </div>

          <div className="animate-fade-up-delay-2 mt-16 grid grid-cols-3 gap-8 sm:gap-16">
            {[
              { label: 'Books', value: `${books.length}+` },
              { label: 'Categories', value: '13' },
              { label: 'Free Access', value: '24/7' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white font-display">{stat.value}</p>
                <p className="text-sm text-white/40 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl font-bold">Featured Books</h2>
              <p className="text-muted-foreground mt-1">Explore our curated CS collection</p>
            </div>
            <Button variant="outline" className="gap-2" onClick={() => navigate('/books')}>
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {featuredBooks.map(book => {
              const colors = ['from-blue-600 to-blue-800', 'from-purple-600 to-purple-800', 'from-emerald-600 to-emerald-800', 'from-amber-600 to-amber-800', 'from-rose-600 to-rose-800', 'from-cyan-600 to-cyan-800', 'from-indigo-600 to-indigo-800', 'from-orange-600 to-orange-800'];
              let hash = 0;
              for (let i = 0; i < book.title.length; i++) hash = book.title.charCodeAt(i) + ((hash << 5) - hash);
              const color = colors[Math.abs(hash) % colors.length];
              return (
                <Card key={book.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer" onClick={() => navigate('/books')}>
                  <div className={`h-36 bg-gradient-to-br ${color} flex items-end p-4 relative`}>
                    <BookOpen className="absolute top-3 right-3 h-8 w-8 text-white/15" />
                    <p className="text-white/90 font-display font-bold text-xs line-clamp-2 drop-shadow-lg">{book.title}</p>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-xs text-muted-foreground truncate">{book.author}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground font-medium">{book.category}</span>
                      <span className={`text-[10px] font-bold ${book.available > 0 ? 'text-success' : 'text-destructive'}`}>
                        {book.available > 0 ? 'Available' : 'Out'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl font-bold">Latest Articles</h2>
              <p className="text-muted-foreground mt-1">Educational content for CS students</p>
            </div>
            <Button variant="outline" className="gap-2" onClick={() => navigate('/articles')}>
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURED_ARTICLES.map((a, i) => (
              <Card key={i} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={() => navigate('/articles')}>
                <CardContent className="p-5">
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">{a.category}</span>
                  <h3 className="font-display font-semibold text-base mt-3 leading-tight">{a.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{a.desc}</p>
                  <p className="text-xs text-primary font-medium mt-3 flex items-center gap-1">Read More <ArrowRight className="h-3 w-3" /></p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl font-bold">Library News</h2>
              <p className="text-muted-foreground mt-1">Stay updated with library events</p>
            </div>
            <Button variant="outline" className="gap-2" onClick={() => navigate('/news')}>
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {NEWS_ITEMS.map((n, i) => (
              <Card key={i} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Newspaper className="h-4 w-4 text-primary" />
                    <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full font-semibold">{n.tag}</span>
                  </div>
                  <h3 className="font-display font-semibold text-base">{n.title}</h3>
                  <p className="text-xs text-muted-foreground mt-2">{n.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold">Need Help?</h2>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">Our library support team is here to assist you</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: HelpCircle, title: 'FAQ', desc: 'Find answers to common questions', to: '/support' },
              { icon: MessageCircle, title: 'Live Chat', desc: 'Chat with library staff in real time', to: '/chat' },
              { icon: Users, title: 'Contact', desc: 'Reach our support team directly', to: '/support' },
            ].map((s, i) => (
              <Card key={i} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer text-center" onClick={() => navigate(s.to)}>
                <CardContent className="p-6">
                  <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                    <s.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-display font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[hsl(222,47%,5%)] text-white/60 py-10">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-1.5">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold text-white">Book<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Bridge</span></span>
          </div>
          <p className="text-sm">A smart bridge between students and books.</p>
          <p className="text-xs mt-4 text-white/30">© 2026 BookBridge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
