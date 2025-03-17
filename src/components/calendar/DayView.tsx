
import React from 'react';
import { CalendarEvent } from '@/types/calendar';

interface DayViewProps {
  currentDate: Date;
  events: CalendarEvent[];
}

const DayView: React.FC<DayViewProps> = ({ currentDate, events }) => {
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8:00 - 19:00
  
  return (
    <div className="mt-4 space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </h2>
      </div>
      
      <div className="bg-white rounded-md border">
        {hours.map(hour => (
          <div key={hour} className="flex border-b last:border-b-0">
            <div className="w-20 p-2 text-right text-sm text-muted-foreground border-r">
              {hour}:00
            </div>
            <div className="flex-1 min-h-16 p-1 relative">
              {events
                .filter(event => {
                  const eventDate = new Date(event.start);
                  return eventDate.getHours() === hour;
                })
                .map(event => (
                  <div 
                    key={event.id}
                    className={`p-2 mb-1 rounded-md text-sm ${
                      event.type === 'hearing' ? 'bg-amber-100 text-amber-800' : 
                      event.type === 'meeting' ? 'bg-blue-100 text-blue-800' : 
                      event.type === 'deadline' ? 'bg-red-100 text-red-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs">
                      {new Date(event.start).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })} - 
                      {new Date(event.end).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayView;
