
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { CalendarEvent } from '@/types/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { mockEvents } from '@/data';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import DayView from '@/components/calendar/DayView';
import WeekView from '@/components/calendar/WeekView';
import MonthView from '@/components/calendar/MonthView';
import { getDaysInMonth, getMonthName, getWeekDays } from '@/utils/calendarUtils';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  
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
            <CalendarHeader 
              view={view}
              setView={setView}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              handleToday={handleToday}
            />
            
            {view === 'day' && (
              <DayView
                currentDate={currentDate}
                events={getEventsForDate(currentDate)}
              />
            )}
            
            {view === 'week' && (
              <WeekView
                weekDays={getWeekDays(currentDate)}
                getEventsForDate={getEventsForDate}
              />
            )}
            
            {view === 'month' && (
              <MonthView
                currentDate={currentDate}
                getEventsForDate={getEventsForDate}
                getMonthName={getMonthName}
                getDaysInMonth={getDaysInMonth}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
