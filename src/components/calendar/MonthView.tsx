
import React from 'react';
import { CalendarEvent } from '@/types/calendar';

interface MonthViewProps {
  currentDate: Date;
  getEventsForDate: (date: Date) => CalendarEvent[];
  getMonthName: (date: Date) => string;
  getDaysInMonth: (year: number, month: number) => number;
}

const MonthView: React.FC<MonthViewProps> = ({ 
  currentDate, 
  getEventsForDate, 
  getMonthName, 
  getDaysInMonth 
}) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay() || 7; // 1-7 (Monday-Sunday)
  
  // Generate days for previous month to fill the calendar
  const daysFromPrevMonth = firstDay - 1;
  
  // Total cells needed (prev month days + current month days + potential next month days)
  const totalDays = daysFromPrevMonth + daysInMonth;
  const totalWeeks = Math.ceil(totalDays / 7);
  const totalCells = totalWeeks * 7;
  
  const days = [];
  
  // Previous month days
  const prevMonth = new Date(year, month, 0);
  const prevMonthDays = prevMonth.getDate();
  
  for (let i = 0; i < daysFromPrevMonth; i++) {
    const day = prevMonthDays - daysFromPrevMonth + i + 1;
    days.push({
      date: new Date(year, month - 1, day),
      isCurrentMonth: false
    });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true
    });
  }
  
  // Next month days
  const remainingCells = totalCells - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false
    });
  }
  
  const dayNames = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  
  return (
    <div className="mt-4 space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold">
          {getMonthName(currentDate)} {year}
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
          {days.map(({ date, isCurrentMonth }) => {
            const events = getEventsForDate(date);
            const isToday = date.toDateString() === new Date().toDateString();
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            
            return (
              <div 
                key={date.toString()} 
                className={`min-h-20 p-1 border-r border-b last:border-r-0 ${
                  !isCurrentMonth ? 'bg-muted/50 text-muted-foreground' : ''
                } ${
                  isWeekend && isCurrentMonth ? 'bg-muted/30' : ''
                }`}
              >
                <div className={`text-right p-1 ${isToday ? 'font-bold text-primary' : ''}`}>
                  {date.getDate()}
                </div>
                <div className="space-y-1">
                  {events.slice(0, 2).map(event => (
                    <div 
                      key={event.id}
                      className={`p-1 rounded-sm text-xs ${
                        event.type === 'hearing' ? 'bg-amber-100 text-amber-800' : 
                        event.type === 'meeting' ? 'bg-blue-100 text-blue-800' : 
                        event.type === 'deadline' ? 'bg-red-100 text-red-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="truncate">{event.title}</div>
                    </div>
                  ))}
                  {events.length > 2 && (
                    <div className="text-xs text-center text-muted-foreground">
                      +{events.length - 2} mais
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

export default MonthView;
