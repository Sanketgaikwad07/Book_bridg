import AppLayout from '@/components/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { BookMarked, ArrowRight, Code, Brain, Database, Globe, Shield, Cpu, BookOpen, Lightbulb } from 'lucide-react';

const ARTICLES = [
  { title: 'Understanding Big-O Notation', desc: 'A comprehensive guide to analyzing algorithm time and space complexity. Learn how to evaluate and compare algorithms.', category: 'Algorithms', icon: Code, color: 'from-blue-500 to-blue-600' },
  { title: 'Introduction to Neural Networks', desc: 'Learn the fundamental concepts behind deep learning, including perceptrons, activation functions, and backpropagation.', category: 'AI', icon: Brain, color: 'from-purple-500 to-purple-600' },
  { title: 'Database Normalization Explained', desc: 'Master 1NF through 5NF normalization forms. Design efficient, redundancy-free relational database schemas.', category: 'Databases', icon: Database, color: 'from-emerald-500 to-emerald-600' },
  { title: 'TCP/IP Protocol Deep Dive', desc: 'Understand the four layers of the TCP/IP model and how data traverses networks from application to hardware.', category: 'Networking', icon: Globe, color: 'from-cyan-500 to-cyan-600' },
  { title: 'Cybersecurity Fundamentals', desc: 'Learn about common attack vectors, encryption methods, and best practices for securing applications.', category: 'Security', icon: Shield, color: 'from-rose-500 to-rose-600' },
  { title: 'Operating System Scheduling', desc: 'Explore CPU scheduling algorithms like FCFS, SJF, Round Robin, and Priority Scheduling with examples.', category: 'OS', icon: Cpu, color: 'from-amber-500 to-amber-600' },
  { title: 'Design Patterns in Software', desc: 'Understand Singleton, Observer, Factory, and other essential design patterns used in professional development.', category: 'Software', icon: BookOpen, color: 'from-indigo-500 to-indigo-600' },
  { title: 'Machine Learning Basics', desc: 'Get started with supervised and unsupervised learning, regression, classification, and model evaluation techniques.', category: 'ML', icon: Lightbulb, color: 'from-orange-500 to-orange-600' },
];

const ArticlesPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <BookMarked className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">Articles</h1>
            <p className="text-muted-foreground mt-1">Educational content for CS students</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {ARTICLES.map((a, i) => {
            const Icon = a.icon;
            return (
              <Card key={i} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                <div className={`h-24 bg-gradient-to-br ${a.color} flex items-center justify-center relative`}>
                  <Icon className="h-10 w-10 text-white/30" />
                  <span className="absolute top-3 left-3 text-[10px] bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full font-semibold">{a.category}</span>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-display font-semibold text-sm leading-tight">{a.title}</h3>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-3">{a.desc}</p>
                  <p className="text-xs text-primary font-semibold mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Article <ArrowRight className="h-3 w-3" />
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default ArticlesPage;
