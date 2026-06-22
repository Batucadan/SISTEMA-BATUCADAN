/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  MapPin, 
  Clock, 
  User, 
  Filter, 
  X, 
  Trash2, 
  Music, 
  Radio, 
  Megaphone,
  Sparkles
} from 'lucide-react';
import { CalendarEvent, EventType } from '../types';

interface CalendarViewProps {
  events: CalendarEvent[];
  onAddEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  onDeleteEvent: (eventId: string) => void;
  teamMembers: string[];
}

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const EVENT_TYPES: { value: EventType; label: string; color: string; bg: string; dot: string }[] = [
  { value: 'postagem', label: 'Postagem', color: 'text-orange-700', bg: 'bg-orange-50 border-orange-150', dot: 'bg-orange-500' },
  { value: 'lancamento', label: 'Lançamento Musical', color: 'text-violet-700', bg: 'bg-violet-50 border-violet-150', dot: 'bg-violet-500' },
  { value: 'show', label: 'Show', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-150', dot: 'bg-amber-500' },
  { value: 'oficina', label: 'Oficina Rítmica', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-150', dot: 'bg-indigo-500' },
  { value: 'reuniao', label: 'Reunião', color: 'text-sky-700', bg: 'bg-sky-50 border-sky-150', dot: 'bg-sky-500' },
  { value: 'prazo', label: 'Prazo Interno', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-150', dot: 'bg-rose-500' }
];

export default function CalendarView({
  events,
  onAddEvent,
  onDeleteEvent,
  teamMembers
}: CalendarViewProps) {
  // Calendar dates selection state (default June 2026 based on system timestamp)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(5); // June (0-indexed -> 5 is June)
  const [selectedDate, setSelectedDate] = useState<string>('2026-06-21');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [responsibleFilter, setResponsibleFilter] = useState<string>('all');

  // Add Event Form State
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('2026-06-21');
  const [newType, setNewType] = useState<EventType>('postagem');
  const [newResponsible, setNewResponsible] = useState('Danilo');
  const [newDescription, setNewDescription] = useState('');
  const [newTime, setNewTime] = useState('14:00');

  // Month-switching logic
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  // Get days in a specific month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get index of first day of the month (0 = Sunday, 1 = Monday ...)
  const getFirstDayOfMonthIndex = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const totalDays = getDaysInMonth(currentYear, currentMonth);
  const startDayIdx = getFirstDayOfMonthIndex(currentYear, currentMonth);

  // Generate calendar grid array
  const dayCells = [];
  // Fill previous month cells empty representation
  for (let i = 0; i < startDayIdx; i++) {
    dayCells.push(null);
  }
  // Fill current month days
  for (let d = 1; d <= totalDays; d++) {
    dayCells.push(d);
  }

  // Format date helper (YYYY-MM-DD)
  const formatYYYYMMDD = (year: number, month: number, day: number) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  // Filtered Events depending on search criteria
  const filteredEvents = events.filter(e => {
    const matchesType = typeFilter === 'all' || e.type === typeFilter;
    const matchesUser = responsibleFilter === 'all' || e.responsible === responsibleFilter;
    return matchesType && matchesUser;
  });

  // Calendar Day Events finder
  const getDayEvents = (day: number) => {
    const formatted = formatYYYYMMDD(currentYear, currentMonth, day);
    return filteredEvents.filter(e => e.date === formatted);
  };

  const activeDayEvents = events.filter(e => e.date === selectedDate);

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    onAddEvent({
      title: newTitle,
      date: newDate,
      type: newType,
      responsible: newResponsible,
      description: newDescription,
      time: newTime
    });

    // Reset Fields
    setNewTitle('');
    setNewDescription('');
    setNewTime('14:00');
    setIsAdding(false);
  };

  const getEventStyle = (type: EventType) => {
    const match = EVENT_TYPES.find(t => t.value === type);
    return match ? `${match.bg} ${match.color}` : 'bg-slate-100 text-slate-800';
  };

  const getEventDotStyle = (type: EventType) => {
    const match = EVENT_TYPES.find(t => t.value === type);
    return match ? match.dot : 'bg-slate-400';
  };

  const getEventLabel = (type: EventType) => {
    const match = EVENT_TYPES.find(t => t.value === type);
    return match ? match.label : type;
  };

  return (
    <div className="space-y-6" id="calendar-container">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display text-slate-800">
            Agenda Integrada
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Visualização consolidada de canais, lançamentos rítmicos, oficinas escolares, compromissos e shows comerciais.
          </p>
        </div>

        <button
          onClick={() => {
            setNewDate(selectedDate);
            setIsAdding(true);
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-colors self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Agendar Evento
        </button>
      </div>

      {/* Filters Area */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2">Filtros da Agenda</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Calendar Type filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs font-semibold border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 text-slate-600 focus:border-orange-500"
          >
            <option value="all">Categoria: Todas as Agendas</option>
            {EVENT_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          {/* Leader filter */}
          <select
            value={responsibleFilter}
            onChange={(e) => setResponsibleFilter(e.target.value)}
            className="text-xs font-semibold border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 text-slate-600 focus:border-orange-500"
          >
            <option value="all">Responsável: Todos</option>
            {teamMembers.map(tm => (
              <option key={tm} value={tm}>{tm}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid Layout - Calendar Month + Selected Day details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly Grid Column (Col Span 2) */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-5 card-shadow flex flex-col" id="calendar-left-grid">
          {/* Monthly Navigation Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-800 text-lg font-display flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-orange-500" />
              {MONTHS[currentMonth]} {currentYear}
            </h2>
            
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevMonth}
                className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 transition-colors"
                title="Mês anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setCurrentYear(2026);
                  setCurrentMonth(5); // June
                  setSelectedDate('2026-06-21');
                }}
                className="text-xs font-semibold px-3 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600"
              >
                Hoje (Junho/26)
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 transition-colors"
                title="Próximo mês"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grid Layout Header Day Labels */}
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs uppercase text-slate-400 mb-2 font-display">
            {WEEKDAYS.map(day => (
              <div key={day} className="py-2">{day}</div>
            ))}
          </div>

          {/* Grid Days Map */}
          <div className="grid grid-cols-7 gap-1.5 flex-1" id="calendar-day-cells">
            {dayCells.map((day, idx) => {
              if (day === null) {
                return (
                  <div key={`empty-${idx}`} className="aspect-square bg-slate-50/40 border border-slate-100/50 rounded-xl" />
                );
              }

              const cellDate = formatYYYYMMDD(currentYear, currentMonth, day);
              const isSelected = selectedDate === cellDate;
              const isSystemCurrentDay = cellDate === '2026-06-21';
              const dayEvents = getDayEvents(day);

              return (
                <div
                  key={`day-${day}`}
                  onClick={() => setSelectedDate(cellDate)}
                  className={`aspect-square p-2 border rounded-xl flex flex-col justify-between transition-all cursor-pointer relative group ${
                    isSelected 
                      ? 'border-orange-500 bg-orange-50/10 ring-1 ring-orange-500/25 shadow-xs' 
                      : isSystemCurrentDay 
                        ? 'border-indigo-400 bg-indigo-50/10' 
                        : 'border-slate-100 bg-white hover:bg-slate-50/70 hover:border-slate-300'
                  }`}
                >
                  {/* Number label & highlights */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold font-mono ${
                      isSelected 
                        ? 'text-orange-600' 
                        : isSystemCurrentDay 
                          ? 'w-5 h-5 flex items-center justify-center bg-indigo-600 text-white rounded-full text-[10px]' 
                          : 'text-slate-700'
                    }`}>
                      {day}
                    </span>
                    
                    {dayEvents.length > 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 block md:hidden" />
                    )}
                  </div>

                  {/* Desktop-only: Show maximum 2 micro tags of events directly on cell */}
                  {dayEvents.length > 0 && (
                    <div className="hidden md:flex flex-col gap-1 mt-1 overflow-hidden" id={`day-${day}-events`}>
                      {dayEvents.slice(0, 2).map(ev => (
                        <div 
                          key={ev.id} 
                          style={{
                            backgroundColor: EVENT_TYPES.find(t => t.value === ev.type)?.bg ? undefined : '#f1f5f9'
                          }}
                          className={`text-[8px] font-bold px-1.5 py-0.5 rounded-xs truncate border leading-none font-sans ${getEventStyle(ev.type)} max-w-full`}
                        >
                          {ev.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <span className="text-[8px] font-bold text-slate-400 pl-1">
                          +{dayEvents.length - 2} mais
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Color Key Guide */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-x-4 gap-y-2 justify-center" id="calendar-types-legend">
            {EVENT_TYPES.map(t => (
              <div key={t.value} className="flex items-center gap-1.5 text-xs">
                <span className={`w-2.5 h-2.5 rounded-full ${t.dot}`} />
                <span className="text-slate-600 font-medium">{t.label}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Selected Day Timeline view (Col Span 1) */}
        <div className="flex flex-col space-y-4" id="calendar-right-timeline">
          
          {/* Day overview card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-2xs">
            <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Compromissos</span>
                <h3 className="font-bold text-slate-800 text-sm font-display">
                  {selectedDate.split('-').reverse().join('/')}
                </h3>
              </div>
              <span className="text-xs font-bold font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                {activeDayEvents.length} listados
              </span>
            </div>

            <div className="space-y-3.5 max-h-[350px] overflow-y-auto">
              {activeDayEvents.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  <Sparkles className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                  Nenhum compromisso marcado para este dia.
                </div>
              ) : (
                activeDayEvents.map(ev => (
                  <div 
                    key={ev.id} 
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors flex justify-between items-start group"
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className={`w-2 h-2 rounded-full ${getEventDotStyle(ev.type)}`} />
                        <span className="text-[9px] font-bold uppercase tracking-wide text-slate-500">
                          {getEventLabel(ev.type)}
                        </span>
                      </div>
                      
                      <h4 className="text-xs font-bold text-slate-800">{ev.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-1">{ev.description}</p>
                      
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
                        {ev.time && (
                          <div className="flex items-center gap-1 text-[10px] text-slate-500">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{ev.time} h</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-[10px] text-slate-500">
                          <User className="w-3 h-3 text-slate-400" />
                          <span>Resp: {ev.responsible}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm('Deseja realmente cancelar este agendamento?')) {
                          onDeleteEvent(ev.id);
                        }
                      }}
                      className="p-1 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Quick schedule shortcut button */}
            <button
              onClick={() => {
                setNewDate(selectedDate);
                setIsAdding(true);
              }}
              className="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-3.5 h-3.5" /> Adicionar Compromisso Hoje
            </button>
          </div>

          {/* Informational helpful box */}
          <div className="bg-orange-550 text-white p-5 rounded-3xl flex gap-3.5 items-start shadow-xs">
            <Radio className="w-5 h-5 shrink-0 mt-0.5 text-orange-100" />
            <div>
              <h4 className="text-xs font-bold font-display uppercase tracking-wider">Diretiva de Comunicação</h4>
              <p className="text-[11px] text-orange-50 mt-1 focus:text-white leading-relaxed">
                Todas as postagens ativas no YouTube e estreias musicais de videoclipes agendadas na esteira Kanban aparecem aqui de forma vinculada, evitando choque de datas com apresentações de shows e reuniões corporativas importantes.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* MODAL: ADD EVENT */}
      {isAdding && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-sm w-full p-6 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800 text-md font-display">Agendar Compromisso / Prazo</h3>
              <button
                onClick={() => setIsAdding(false)}
                className="p-1 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Título do Evento</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Show na Feira do Livro de Osasco"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2.5 focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Data</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Hora (Horário)</label>
                  <input
                    type="text"
                    required
                    placeholder="HH:MM"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Tipo de Evento</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as EventType)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50 focus:border-orange-500"
                  >
                    {EVENT_TYPES.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Responsável Líder</label>
                  <select
                    value={newResponsible}
                    onChange={(e) => setNewResponsible(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50 focus:border-orange-500"
                  >
                    {teamMembers.map(tm => (
                      <option key={tm} value={tm}>{tm}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Notas / Detalhes</label>
                <textarea
                  rows={3}
                  placeholder="Local, canais envolvidos, links, etc..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2.5 focus:border-orange-500"
                />
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-2.5 rounded-xl transition-colors"
                >
                  Salvar na Agenda
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-650 font-bold text-xs px-4"
                >
                  Voltar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
