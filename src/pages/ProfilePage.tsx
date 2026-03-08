import { useLibrary } from '@/context/LibraryContext';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Shield, Calendar, BookCopy, CheckCircle2, AlertTriangle } from 'lucide-react';

const ProfilePage = () => {
  const { currentUser, records, books } = useLibrary();

  if (!currentUser) return null;

  const userRecords = records.filter(r => r.userId === currentUser.id);
  const borrowed = userRecords.filter(r => r.status === 'Borrowed').length;
  const returned = userRecords.filter(r => r.status === 'Returned').length;
  const overdue = userRecords.filter(r => r.status === 'Overdue').length;

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="shadow-xl border-border/50 overflow-hidden">
          {/* Profile Header */}
          <div className="h-24 bg-gradient-to-r from-primary to-accent relative">
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
              <div className="w-20 h-20 rounded-2xl bg-card border-4 border-card flex items-center justify-center shadow-lg">
                <User className="h-10 w-10 text-primary" />
              </div>
            </div>
          </div>
          <CardHeader className="text-center pt-14 pb-2">
            <CardTitle className="font-display text-2xl">{currentUser.name}</CardTitle>
            <Badge className="mx-auto mt-2 capitalize bg-gradient-to-r from-primary to-accent text-white border-0">{currentUser.role}</Badge>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3.5 transition-colors hover:bg-muted/80">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground font-medium">Email</p>
                <p className="font-medium text-sm">{currentUser.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3.5 transition-colors hover:bg-muted/80">
              <Shield className="h-5 w-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground font-medium">Role</p>
                <p className="font-medium capitalize text-sm">{currentUser.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3.5 transition-colors hover:bg-muted/80">
              <Calendar className="h-5 w-5 text-success" />
              <div>
                <p className="text-xs text-muted-foreground font-medium">Member Since</p>
                <p className="font-medium text-sm">{currentUser.createdAt}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card className="stat-card">
            <CardContent className="p-5 text-center">
              <BookCopy className="h-5 w-5 text-warning mx-auto mb-2" />
              <p className="text-2xl font-bold font-display text-warning">{borrowed}</p>
              <p className="text-xs text-muted-foreground mt-1">Borrowed</p>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent className="p-5 text-center">
              <CheckCircle2 className="h-5 w-5 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold font-display text-success">{returned}</p>
              <p className="text-xs text-muted-foreground mt-1">Returned</p>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent className="p-5 text-center">
              <AlertTriangle className="h-5 w-5 text-destructive mx-auto mb-2" />
              <p className="text-2xl font-bold font-display text-destructive">{overdue}</p>
              <p className="text-xs text-muted-foreground mt-1">Overdue</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
