/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, 
  CheckCircle, 
  Clock, 
  Award, 
  ListTodo, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  Briefcase,
  AlertCircle,
  HelpCircle,
  FolderOpen,
  X,
  Plus
} from 'lucide-react';
import { TeamMember, ContentCard, CalendarEvent } from '../types';

interface TeamViewProps {
  team: TeamMember[];
  contentCards: ContentCard[];
  events: CalendarEvent[];
}

export default function TeamView({
  team,
  contentCards,
  events
}: TeamViewProps) {
  const [selectedMemberId, setSelectedMemberId] = useState<string>(team[0]?.id || 'danilo');

  const selectedMember = team.find(m => m.id === selectedMemberId) || team[0];

  // Dynamic calculations for the selected team member
  const memberName = selectedMember.name;

  // 1. Open Tasks (Kanban cards assigned, not in stage 'Pronto', 'Publicado')
  const openContentTasks = contentCards.filter(
    c => c.responsible === memberName && c.stage !== 'Pronto' && c.stage !== 'Publicado'
  );

  // 2. Open Calendar events (Events in calendar, in current month or future, assigned to them)
  const openCalendarEvents = events.filter(
    e => e.responsible === memberName && e.date >= '2026-06-21'
  );

  // 3. Completed deliverables this week/historic (Kanban cards that are Pronto or Publicado)
  const completedDeliveries = contentCards.filter(
    c => c.responsible === memberName && (c.stage === 'Pronto' || c.stage === 'Publicado')
  );

  const totalOpenTasksCount = openContentTasks.length + openCalendarEvents.length;

  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  const getMemberStageBadgeColor = (memberId: string) => {
    switch (memberId) {
      case 'danilo': return 'bg-orange-50 text-orange-805 border-orange-250';
      case 'sora': return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'risael': return 'bg-indigo-50 text-indigo-800 border-indigo-300';
      case 'rulio': return 'bg-rose-50 text-rose-800 border-rose-300';
      default: return 'bg-slate-50 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-6" id="team-container">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display text-slate-800">
            Nossa Equipe
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Visualização dinâmica de lideranças, responsabilidades primárias e tarefas ativas por departamento.
          </p>
        </div>
      </div>

      {/* Main content grid: Left small list, Right expanded member details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Team selector cards */}
        <div className="lg:col-span-1 space-y-3" id="team-selector-col">
          <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2 pl-1 block">Integrantes de Operação</h3>
          {team.map(member => {
            const memberOpenTasks = contentCards.filter(
              c => c.responsible === member.name && c.stage !== 'Pronto' && c.stage !== 'Publicado'
            ).length + events.filter(
              e => e.responsible === member.name && e.date >= '2026-06-21'
            ).length;

            const isSelected = member.id === selectedMemberId;

            return (
              <div
                key={member.id}
                onClick={() => setSelectedMemberId(member.id)}
                className={`p-4 border rounded-2xl cursor-pointer transition-all flex items-center justify-between ${
                  isSelected 
                    ? 'bg-white border-orange-500 card-shadow ring-1 ring-orange-500/25' 
                    : 'bg-white/80 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border uppercase shrink-0 ${member.color}`}>
                    {getInitials(member.name)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-800 text-sm truncate">{member.name}</h4>
                    <p className="text-[11px] text-slate-500 truncate">{member.role}</p>
                  </div>
                </div>

                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  memberOpenTasks > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  {memberOpenTasks} abertas
                </span>
              </div>
            );
          })}
        </div>

        {/* Right Col: Expanded Member Workspace */}
        <div className="lg:col-span-2 space-y-6" id="team-workspace-pane">
          
          {/* Main workspace profile card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-5">
            {/* Upper profile summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 pb-5">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg border-2 uppercase shrink-0 shadow-xs ${selectedMember.color}`}>
                  {getInitials(selectedMember.name)}
                </div>
                <div>
                  <h2 className="text-xl font-bold font-display text-slate-800">{selectedMember.name}</h2>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{selectedMember.role}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-slate-50 border border-slate-150 px-3.5 py-1.5 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold leading-none">Entregas Feitas</span>
                  <span className="text-sm font-bold font-mono text-orange-500 block mt-1">{completedDeliveries.length}</span>
                </div>
                <div className="bg-slate-50 border border-slate-150 px-3.5 py-1.5 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold leading-none">Ações Pendentes</span>
                  <span className="text-sm font-bold font-mono text-amber-600 block mt-1">{totalOpenTasksCount}</span>
                </div>
              </div>
            </div>

            {/* Department Responsibilities list Grid */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-orange-500" /> Atribuições & Responsabilidades do Cargo
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedMember.responsibilities.map((resp, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex gap-2 items-start hover:bg-slate-100/40 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                    <p className="text-[11px] text-slate-600 font-sans leading-relaxed">{resp}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks Abas tabs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
              
              {/* Left card: Open production & Scheduled activities */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" /> Tarefas em Progresso ({openContentTasks.length})
                </h4>

                <div className="space-y-2 max-h-[250px] overflow-y-auto">
                  {openContentTasks.length === 0 ? (
                    <p className="text-xs text-slate-400 py-6 italic text-center">Nenhuma peça em produção ativa atribuída.</p>
                  ) : (
                    openContentTasks.map(t => (
                      <div key={t.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center gap-2">
                        <div className="min-w-0 flex-1">
                          <span className="text-[9px] font-bold bg-slate-200 text-slate-600 px-1.5 py-0.2 rounded-sm mb-1 inline-block">
                            {t.productName}
                          </span>
                          <h5 className="text-[11.5px] font-bold text-slate-800 truncate pr-1">{t.title}</h5>
                          <span className="text-[10px] text-slate-500 font-mono">Prazo: {t.deadline.split('-').reverse().slice(0,2).join('/')}</span>
                        </div>
                        <span className="text-[9px] bg-amber-50 text-amber-800 border-amber-200 border px-1.5 rounded font-bold shrink-0">
                          {t.stage}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Right Card: Upcoming Events assigned (agenda) */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-500" /> Próximos Compromissos ({openCalendarEvents.length})
                </h4>

                <div className="space-y-2 max-h-[250px] overflow-y-auto">
                  {openCalendarEvents.length === 0 ? (
                    <p className="text-xs text-slate-400 py-6 italic text-center">Sem compromissos de agenda futuros marcados.</p>
                  ) : (
                    openCalendarEvents.map(ev => (
                      <div key={ev.id} className="bg-indigo-50/10 border border-indigo-100 rounded-xl p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-bold text-indigo-700 uppercase bg-indigo-50 px-2.5 py-0.2 rounded-full">
                            {ev.type}
                          </span>
                          {ev.time && <span className="text-[9.5px] font-mono text-slate-500">{ev.time} h</span>}
                        </div>
                        <h5 className="text-[11.5px] font-bold text-slate-800">{ev.title}</h5>
                        <p className="text-[10px] text-slate-500 mt-0.5 font-mono">Data: {ev.date.split('-').reverse().join('/')}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* Deliveries of the week */}
            <div className="pt-4 border-t border-slate-100 space-y-3.5">
              <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-orange-500" /> Relatório de Entregas Realizadas / Histórico ({completedDeliveries.length})
              </h3>

              {completedDeliveries.length === 0 ? (
                <p className="text-xs text-slate-400 italic">Nenhum marco de publicação registrado esta semana.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-44 overflow-y-auto">
                  {completedDeliveries.map(del => (
                    <div key={del.id} className="bg-orange-50/10 border border-orange-100 p-3 rounded-xl flex justify-between items-center">
                      <div className="min-w-0">
                        <span className="text-[9px] bg-orange-100 text-orange-800 px-1.5 py-0.2 rounded-sm font-bold block mb-1 w-max">
                          {del.productName}
                        </span>
                        <h4 className="text-xs font-bold text-slate-800 truncate pr-1">{del.title}</h4>
                        <span className="text-[10px] text-slate-500 font-sans">Finalizado e postado</span>
                      </div>
                      <span className="text-[10px] font-bold text-orange-700 bg-orange-100/50 px-2 py-0.5 rounded">✓ OK</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Quick departmental info helper */}
          <div className="bg-indigo-600 text-white p-5 rounded-3xl flex gap-3.5 items-start">
            <ListTodo className="w-6 h-6 shrink-0 mt-0.5 text-indigo-100" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider font-display">Controle de Capacidade Interna</h4>
              <p className="text-[11px] text-indigo-100 mt-1 leading-relaxed">
                Essa tela se alimenta de forma bidirecional. Conforme novos cartões são adicionados na esteira e novos compromissos são cadastrados na agenda oficial por quem opera a mesa comercial, esse portal quantifica a dedicação de tarefas para Danilo, Sora, Risael e Rulio, impedindo gargalos operacionais na Batucadan.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
