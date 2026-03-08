import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { HelpCircle, Mail, MessageCircle, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

const FAQS = [
  { q: 'How do I borrow a book?', a: 'Go to the Books page, find the book you want, and click the "Borrow" button. You must be logged in to borrow.' },
  { q: 'How long can I keep a book?', a: 'Each book can be borrowed for 14 days. After that, it will be marked as overdue.' },
  { q: 'How do I return a book?', a: 'Go to "My Borrow" page and click the "Return" button next to the borrowed book.' },
  { q: 'What happens if a book is overdue?', a: 'Overdue books are highlighted in red. Please return them as soon as possible to maintain your borrowing privileges.' },
  { q: 'Can I download books?', a: 'Some books have digital copies available for download. Look for the download button on eligible book cards.' },
  { q: 'How do I create an account?', a: 'Click "Get Started" on the landing page or visit the Register page to create a new student or admin account.' },
];

const SupportPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! Our team will respond shortly.');
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <AppLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <HelpCircle className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">Support</h1>
            <p className="text-muted-foreground mt-1">Get help with BookBridge</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQ */}
          <div>
            <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" /> Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <Card key={i} className="overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm pr-4">{faq.q}</p>
                      {openFaq === i ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                    </div>
                    {openFaq === i && (
                      <p className="text-sm text-muted-foreground mt-3 pt-3 border-t animate-fade-in">{faq.a}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" /> Contact Us
            </h2>
            <Card className="shadow-md">
              <CardContent className="p-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} required placeholder="Your name" className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} required placeholder="your@email.com" className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} required placeholder="How can we help?" rows={4} />
                  </div>
                  <Button type="submit" className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90">
                    <MessageCircle className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="mt-4 shadow-md">
              <CardContent className="p-5">
                <h3 className="font-display font-semibold mb-3">Library Information</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>📍 Main Campus Library, Building A</p>
                  <p>📧 support@bookbridge.edu</p>
                  <p>📞 +1 (555) 123-4567</p>
                  <p>🕐 Mon-Fri: 8AM - 8PM | Sat: 9AM - 5PM</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SupportPage;
