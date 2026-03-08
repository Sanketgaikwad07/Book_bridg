import { useLibrary } from '@/context/LibraryContext';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Shield, Calendar } from 'lucide-react';

const ProfilePage = () => {
  const { currentUser, records, books } = useLibrary();

  if (!currentUser) return null;

  const userRecords = records.filter(r => r.userId === currentUser.id);
  const borrowed = userRecords.filter(r => r.status === 'Borrowed').length;
  const returned = userRecords.filter(r => r.status === 'Returned').length;

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <User className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="font-display text-2xl">{currentUser.name}</CardTitle>
            <Badge variant="secondary" className="mx-auto mt-2 capitalize">{currentUser.role}</Badge>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{currentUser.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium capitalize">{currentUser.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium">{currentUser.createdAt}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="stat-card">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold font-display text-warning">{borrowed}</p>
              <p className="text-sm text-muted-foreground mt-1">Currently Borrowed</p>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold font-display text-success">{returned}</p>
              <p className="text-sm text-muted-foreground mt-1">Returned</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
