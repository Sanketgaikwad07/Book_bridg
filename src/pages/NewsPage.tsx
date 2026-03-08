import AppLayout from '@/components/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Newspaper, BookOpen, CalendarDays, Megaphone, Star, PartyPopper } from 'lucide-react';

const NEWS = [
  { title: '50 New AI & Machine Learning Books Added', desc: 'Explore our expanded collection covering deep learning, NLP, reinforcement learning, and more.', date: 'Mar 5, 2026', tag: 'New Books', icon: BookOpen, color: 'text-blue-500 bg-blue-50' },
  { title: 'Extended Library Hours This Month', desc: 'The library will remain open until 10 PM during exam season to support student preparation.', date: 'Mar 3, 2026', tag: 'Announcement', icon: Megaphone, color: 'text-purple-500 bg-purple-50' },
  { title: 'Spring 2026 Reading Challenge', desc: 'Join our reading challenge! Read 5 books this month and earn a BookBridge Achievement badge.', date: 'Mar 1, 2026', tag: 'Event', icon: PartyPopper, color: 'text-amber-500 bg-amber-50' },
  { title: 'New Computer Architecture Section', desc: 'We have reorganized the Computer Architecture section with updated editions and new reference materials.', date: 'Feb 28, 2026', tag: 'Update', icon: Star, color: 'text-emerald-500 bg-emerald-50' },
  { title: 'Guest Lecture: Future of Cloud Computing', desc: 'Join us for a special lecture on serverless architectures and edge computing trends.', date: 'Feb 25, 2026', tag: 'Event', icon: CalendarDays, color: 'text-cyan-500 bg-cyan-50' },
  { title: 'Digital Library Now Available', desc: 'Selected books are now available for PDF download. Look for the download icon on eligible book cards.', date: 'Feb 20, 2026', tag: 'New Feature', icon: BookOpen, color: 'text-rose-500 bg-rose-50' },
];

const NewsPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <Newspaper className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">Library News</h1>
            <p className="text-muted-foreground mt-1">Stay updated with the latest from BookBridge</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {NEWS.map((n, i) => {
            const Icon = n.icon;
            return (
              <Card key={i} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`rounded-lg p-2 ${n.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground font-semibold">{n.tag}</span>
                  </div>
                  <h3 className="font-display font-semibold text-base leading-tight">{n.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{n.desc}</p>
                  <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" /> {n.date}
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

export default NewsPage;
