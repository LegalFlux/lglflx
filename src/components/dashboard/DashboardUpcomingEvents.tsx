
import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { mockEvents } from '@/data';
import { useRouter } from 'next/router'; // Replace react-router-dom import

const DashboardUpcomingEvents: React.FC = () => {
  const router = useRouter(); // Use Next.js router instead of useNavigate
  
  // Update any navigation functions to use router.push instead of navigate
  // For example:
  const handleViewAll = () => {
    router.push('/calendar');
  };
  
  // Get upcoming events
  const upcomingEvents = [...mockEvents]
    .filter(event => new Date(event.start) > new Date())
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 5);

  return (
    <DashboardCard 
      title="Próximos Eventos" 
      actions={
        <Button variant="ghost" size="sm" onClick={() => router.push('/calendar')} className="text-primary -mr-2">
          Ver Agenda
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </Button>
      }
    >
      <div className="space-y-3">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map(event => (
            <div 
              key={event.id} 
              className="p-3 rounded-md border border-border hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start">
                <div className={`p-2 rounded-md mr-3 ${
                  event.type === 'hearing' ? 'bg-amber-100 text-amber-800' : 
                  event.type === 'meeting' ? 'bg-blue-100 text-blue-800' : 
                  event.type === 'deadline' ? 'bg-red-100 text-red-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {event.type === 'hearing' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 8a6 6 0 0 0-9.33-5"/><path d="m10.67 5.8-.67.5"/><path d="M20.91 8c.61.44.77 1.3.4 1.88l-2.4 3.72a5.94 5.94 0 0 1-5.09 2.92h-6.3a2 2 0 0 1-1.84-1.22l-1.5-3.26a5.7 5.7 0 0 1 1.4-6.26"/><path d="M4.24 15.5c-.33.5-.24 1.18.22 1.5l4.92 3.35c.46.32 1.1.23 1.44-.2l5.76-7.4.01-.01a.9.9 0 0 0 .11-1c-.3-.43-.89-.54-1.32-.25L9.6 15.29"/></svg>}
                  {event.type === 'meeting' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
                  {event.type === 'deadline' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
                  {event.type === 'task' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>}
                  {event.type === 'other' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-2">{event.title}</h4>
                  <div className="flex items-center mt-1">
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mr-1"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.start).toLocaleDateString('pt-BR')} • {new Date(event.start).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {event.location && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {event.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">Nenhum evento próximo</p>
          </div>
        )}
      </div>
    </DashboardCard>
  );
};

export default DashboardUpcomingEvents;
