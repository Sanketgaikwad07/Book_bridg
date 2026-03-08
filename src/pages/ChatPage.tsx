import { useState, useRef, useEffect } from 'react';
import { useLibrary } from '@/context/LibraryContext';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send, Bot, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

const BOT_RESPONSES: Record<string, string> = {
  hello: "Hello! 👋 Welcome to BookBridge support. How can I help you today?",
  hi: "Hi there! 👋 I'm the BookBridge assistant. Ask me about books, borrowing, or the library!",
  borrow: "To borrow a book, go to the Books page, find the book you want, and click 'Borrow'. You'll have 14 days to return it.",
  return: "To return a book, go to 'My Borrow' page and click the 'Return' button next to the borrowed book.",
  overdue: "If a book is overdue, it will show a red 'Overdue' badge. Please return it as soon as possible to avoid penalties.",
  hours: "The BookBridge digital library is available 24/7! During exam season, physical library hours are extended until 10 PM.",
  help: "I can help with: borrowing books, returning books, finding books, account issues, and general library questions. What do you need?",
  books: "We have 100+ Computer Science books covering Algorithms, Data Structures, AI, Networking, Databases, and more!",
  account: "To manage your account, visit the Profile page. You can view your borrowing stats and account details there.",
  download: "Some books have digital copies available for download. Look for the download icon on eligible book cards.",
};

const getResponse = (msg: string): string => {
  const lower = msg.toLowerCase();
  for (const [key, response] of Object.entries(BOT_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  return "Thanks for your message! Our support team will get back to you shortly. In the meantime, you can check the FAQ on our Support page. 📚";
};

const ChatPage = () => {
  const { currentUser } = useLibrary();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', text: "Hello! 👋 Welcome to BookBridge support. I'm here to help you with anything related to the library. Ask me about borrowing, returning, or finding books!", sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: crypto.randomUUID(),
        text: getResponse(input),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">Live Chat</h1>
            <p className="text-muted-foreground mt-1">Chat with library support</p>
          </div>
        </div>

        <Card className="shadow-lg overflow-hidden">
          {/* Chat Header */}
          <div className="bg-[hsl(222,47%,5%)] px-5 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">BookBridge Support</p>
              <p className="text-white/50 text-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block" /> Online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="h-[400px] overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map(m => (
              <div key={m.id} className={`flex gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  m.sender === 'bot'
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                    : 'bg-secondary'
                }`}>
                  {m.sender === 'bot' ? <Bot className="h-3.5 w-3.5 text-white" /> : <User className="h-3.5 w-3.5 text-secondary-foreground" />}
                </div>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                  m.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-card border rounded-bl-md shadow-sm'
                }`}>
                  <p className="text-sm">{m.text}</p>
                  <p className={`text-[10px] mt-1 ${m.sender === 'user' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-card">
            <form onSubmit={e => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 h-10"
              />
              <Button type="submit" size="sm" className="h-10 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ChatPage;
