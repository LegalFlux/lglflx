import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { CalendarEvent } from '@/types/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { mockEvents } from '@/data';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getMonthName = (date: Date) => {
    return date.toLocaleString('pt-PT', { month: 'long' });
  };
  
  const getWeekDays = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    const monday = new Date(date.setDate(diff));
    const result = [];
    
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(monday);
      nextDay.setDate(monday.getDate() + i);
      result.push(nextDay);
    }
    
    return result;
  };
  
  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear();
    });
  };
  
  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    
    if (view === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    
    setCurrentDate(newDate);
  };
  
  const handleNext = () => {
    const newDate = new Date(currentDate);
    
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    
    setCurrentDate(newDate);
  };
  
  const handleToday = () => {
    setCurrentDate(new Date());
  };
  
  const renderDayView = () => {
    const events = getEventsForDate(currentDate);
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
  
  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
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
  
  const renderMonthView = () => {
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
  
  return (
    <div className="min-h-screen bg-background pt-16 animate-fade-in">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <PageHeader
          title="Agenda"
          description="Gerencie os seus compromissos, audiências e prazos"
          icon={<CalendarIcon size={28} />}
          actions={
            <Button>
              <Plus size={16} className="mr-2" />
              Novo Evento
            </Button>
          }
        />
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={handlePrevious}>
                  <ChevronLeft size={16} />
                </Button>
                <Button size="sm" variant="outline" onClick={handleToday}>
                  Hoje
                </Button>
                <Button size="sm" variant="outline" onClick={handleNext}>
                  <ChevronRight size={16} />
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant={view === 'day' ? 'default' : 'outline'}
                  onClick={() => setView('day')}
                >
                  Dia
                </Button>
                <Button 
                  size="sm" 
                  variant={view === 'week' ? 'default' : 'outline'}
                  onClick={() => setView('week')}
                >
                  Semana
                </Button>
                <Button 
                  size="sm" 
                  variant={view === 'month' ? 'default' : 'outline'}
                  onClick={() => setView('month')}
                >
                  Mês
                </Button>
                <Button size="sm" variant="outline">
                  <Filter size={16} />
                </Button>
              </div>
            </div>
            
            {view === 'day' && renderDayView()}
            {view === 'week' && renderWeekView()}
            {view === 'month' && renderMonthView()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
