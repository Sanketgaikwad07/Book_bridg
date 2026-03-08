import { useMemo } from 'react';
import { useLibrary } from '@/context/LibraryContext';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { CalendarDays, BookOpen, AlertTriangle, Clock } from 'lucide-react';

const CalendarPage = () => {
  const { currentUser, records, books } = useLibrary();

  const userRecords = records.filter(r => r.userId === currentUser?.id);

  const borrowDates = useMemo(() => userRecords.filter(r => r.borrowDate).map(r => new Date(r.borrowDate + 'T00:00:00')), [userRecords]);
  const dueDates = useMemo(() => userRecords.filter(r => r.status !== 'Returned' && r.expectedReturnDate).map(r => new Date(r.expectedReturnDate + 'T00:00:00')), [userRecords]);
  const overdueDates = useMemo(() => userRecords.filter(r => r.status === 'Overdue' && r.expectedReturnDate).map(r => new Date(r.expectedReturnDate + 'T00:00:00')), [userRecords]);

  const activeRecords = userRecords.filter(r => r.status === 'Borrowed' || r.status === 'Overdue');

  const modifiers = {
    borrowed: borrowDates,
    due: dueDates,
    overdue: overdueDates,
  };

  const modifiersStyles = {
    borrowed: { backgroundColor: 'hsl(221, 83%, 53%)', color: 'white', borderRadius: '50%' },
    due: { backgroundColor: 'hsl(38, 92%, 50%)', color: 'white', borderRadius: '50%' },
    overdue: { backgroundColor: 'hsl(0, 84%, 60%)', color: 'white', borderRadius: '50%' },
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <CalendarDays className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">Calendar</h1>
            <p className="text-muted-foreground mt-1">Track your borrow dates and deadlines</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-2 shadow-md">
            <CardContent className="p-6 flex justify-center">
              <Calendar
                mode="multiple"
                selected={[...borrowDates, ...dueDates]}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                className="rounded-xl border shadow-sm pointer-events-auto"
              />
            </CardContent>
          </Card>

          {/* Legend & Upcoming */}
          <div className="space-y-4">
            <Card className="shadow-md">
              <CardContent className="p-5">
                <h3 className="font-display font-semibold mb-4">Legend</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-primary" />
                    <span className="text-sm">Borrow Date</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-warning" />
                    <span className="text-sm">Return Deadline</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-destructive" />
                    <span className="text-sm">Overdue</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardContent className="p-5">
                <h3 className="font-display font-semibold mb-4">Upcoming Deadlines</h3>
                {activeRecords.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No upcoming deadlines.</p>
                ) : (
                  <div className="space-y-3">
                    {activeRecords.slice(0, 5).map(r => {
                      const book = books.find(b => b.id === r.bookId);
                      const isOverdue = r.status === 'Overdue';
                      return (
                        <div key={r.id} className={`rounded-lg px-3 py-2.5 border ${isOverdue ? 'bg-destructive/5 border-destructive/20' : 'bg-warning/5 border-warning/20'}`}>
                          <div className="flex items-center gap-2">
                            {isOverdue ? <AlertTriangle className="h-3.5 w-3.5 text-destructive shrink-0" /> : <Clock className="h-3.5 w-3.5 text-warning shrink-0" />}
                            <p className="text-sm font-medium truncate">{book?.title || 'Unknown'}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 ml-5.5">Due: {r.expectedReturnDate}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CalendarPage;
