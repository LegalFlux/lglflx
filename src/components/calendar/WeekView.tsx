
import React from 'react';
import { CalendarEvent } from '@/types/calendar';

interface WeekViewProps {
  weekDays: Date[];
  getEventsForDate: (date: Date) => CalendarEvent[];
}

const WeekView: React.FC<WeekViewProps> = ({ weekDays, getEventsForDate }) => {
  const dayNames = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  
  return (
    <div className="mt-4 space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold">
          {weekDays[0].toLocaleDateString('pt-PT', { day: 'numeric' })} - {weekDays[6].toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })}
        </h2>
      </div>
      
      <div className="bg-white rounded-md border overflow-hidden">
        <div className="grid grid-cols-7 border-b">
          {dayNames.map((day, index) => (
            <div 
              key={day} 
              className={`p-2 text-center font-medium ${index > 4 ? 'text-muted-foreground' : ''}`}
            >
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7">
          {weekDays.map((date, index) => {
            const events = getEventsForDate(date);
            const isToday = date.toDateString() === new Date().toDateString();
            
            return (
              <div 
                key={date.toString()} 
                className={`min-h-24 p-1 border-r border-b last:border-r-0 ${
                  index > 4 ? 'bg-muted/30' : ''
                }`}
              >
                <div className={`text-right p-1 ${isToday ? 'font-bold text-primary' : ''}`}>
                  {date.getDate()}
                </div>
                <div className="space-y-1">
                  {events.slice(0, 3).map(event => (
                    <div 
                      key={event.id}
                      className={`p-1 rounded-sm text-xs ${
                        event.type === 'hearing' ? 'bg-amber-100 text-amber-800' : 
                        event.type === 'meeting' ? 'bg-blue-100 text-blue-800' : 
                        event.type === 'deadline' ? 'bg-red-100 text-red-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="truncate text-[10px]">
                        {new Date(event.start).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ))}
                  {events.length > 3 && (
                    <div className="text-xs text-center text-muted-foreground">
                      +{events.length - 3} mais
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
