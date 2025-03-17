
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';

interface CalendarHeaderProps {
  view: 'day' | 'week' | 'month';
  setView: (view: 'day' | 'week' | 'month') => void;
  handlePrevious: () => void;
  handleNext: () => void;
  handleToday: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  view,
  setView,
  handlePrevious,
  handleNext,
  handleToday
}) => {
  return (
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
  );
};

export default CalendarHeader;
