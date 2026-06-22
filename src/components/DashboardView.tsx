/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  TrendingUp, 
  Calendar, 
  AlertCircle, 
  Clock, 
  DollarSign, 
  Music, 
  Briefcase, 
  FileText, 
  ChevronRight, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  User,
  ExternalLink,
  Award,
  Play,
  CheckCircle
} from 'lucide-react';
import { ContentCard, CalendarEvent, CommercialLead, FinancialEntry } from '../types';

interface DashboardViewProps {
  contentCards: ContentCard[];
  events: CalendarEvent[];
  leads: CommercialLead[];
  financials: FinancialEntry[];
  onNavigate: (tab: string) => void;
}

export default function DashboardView({
  contentCards,
  events,
  leads,
  financials,
  onNavigate
}: DashboardViewProps) {
  const currentSystemDate = '2026-06-21'; // matching user's system date context

  // 1. Financial KPI Calculations (for June 2026)
  const juneReceipts = financials.filter(
    (f) => f.type === 'receita' && f.date.startsWith('2026-06')
  );
  const juneExpenses = financials.filter(
    (f) => f.type === 'despesa' && f.date.startsWith('2026-06')
  );

  const totalJuneRevenues = juneReceipts.reduce((acc, curr) => acc + curr.value, 0);
  const totalJuneExpenses = juneExpenses.reduce((acc, curr) => acc + curr.value, 0);
  const netEstimatedProfit = totalJuneRevenues - totalJuneExpenses;

  const pendingReceivablesTotal = juneReceipts
    .filter((f) => f.paymentStatus === 'Pendente' || f.paymentStatus === 'Atrasado')
    .reduce((acc, curr) => acc + curr.value, 0);

  const pendingPayablesTotal = juneExpenses
    .filter((f) => f.paymentStatus === 'Pendente' || f.paymentStatus === 'Atrasado')
    .reduce((acc, curr) => acc + curr.value, 0);

  // 2. Content Calculations
  const producingCount = contentCards.filter(
    (c) => c.stage !== 'Pronto' && c.stage !== 'Agendado' && c.stage !== 'Publicado'
  );
  const scheduledCount = contentCards.filter((c) => c.stage === 'Agendado');

  // 3. Overdue Tasks and Content (deadline before 2026-06-21, not finished/published)
  const overdueContent = contentCards.filter((c) => {
    return c.deadline < currentSystemDate && c.stage !== 'Publicado' && c.stage !== 'Pronto';
  });

  const overdueEvents = events.filter((e) => {
    // Shows, meetings, or deadlines that passed of has not been dealt with (simplification for dashboard notification)
    return e.date < currentSystemDate && (e.type === 'prazo');
  });

  const allOverdueItemsCount = overdueContent.length + overdueEvents.length;

  // 4. Shows and Releases
  const upcomingEvents = events
    .filter((e) => e.date >= currentSystemDate)
    .sort((a, b) => a.date.localeCompare(b.date));

  const upcomingShows = upcomingEvents.filter((e) => e.type === 'show' || e.type === 'oficina').slice(0, 3);
  const upcomingReleases = upcomingEvents.filter((e) => e.type === 'lancamento' || e.type === 'postagem').slice(0, 3);

  // 5. Commercial pendencies (Leads in transition, not won/lost yet)
  const commercialPendencies = leads.filter(
    (l) => l.status !== 'Fechado' && l.status !== 'Perdido'
  ).sort((a, b) => a.deadline.localeCompare(b.deadline));

  // 6. Financial pendencies
  const pendingInvoices = financials.filter(
    (f) => f.invoiceStatus === 'Pendente' && f.date.startsWith('2026-06')
  );
  
  const pendingPayments = financials.filter(
    (f) => f.paymentStatus === 'Pendente' && f.date.startsWith('2026-06')
  );

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(val);
  };

  const formatDateLabel = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}`;
    }
    return dateStr;
  };

  return (
    <div className="space-y-6" id="dashboard-container">
      {/* Top Welcome Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display text-slate-800" id="dash-welcome">
            Painel Geral Batucadan
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Status operacional e financeiro consolidado em tempo real • <span className="font-mono text-xs">{currentSystemDate}</span>
          </p>
        </div>
        
        {/* Date Display */}
        <div className="flex items-center gap-2 bg-white border border-slate-100 px-4 py-2 rounded-xl card-shadow">
          <Calendar className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-medium text-slate-700">Hoje: 21 de Junho de 2026</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="kpi-grid">
        {/* Receita do Mês */}
        <div 
          onClick={() => onNavigate('financeiro')}
          className="bg-white border border-slate-100 hover:border-slate-200 p-5 rounded-2xl card-shadow transition-all cursor-pointer group"
          id="kpi-receita"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Receita Prevista (Junho)</span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-800 font-mono">
              {formatBRL(totalJuneRevenues)}
            </h3>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span className="font-semibold text-orange-500 font-mono">
                {formatBRL(totalJuneRevenues - pendingReceivablesTotal)}
              </span>
              já recebidos
            </p>
          </div>
        </div>

        {/* Despesa do Mês */}
        <div 
          onClick={() => onNavigate('financeiro')}
          className="bg-white border border-slate-200 hover:border-slate-300 p-5 rounded-2xl shadow-xs transition-all cursor-pointer group"
          id="kpi-despesa"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Despesas Totais (Junho)</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
              <ArrowDownRight className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-800 font-mono">
              {formatBRL(totalJuneExpenses)}
            </h3>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span className="font-semibold text-rose-600 font-mono">
                {formatBRL(totalJuneExpenses - pendingPayablesTotal)}
              </span>
              já pagos
            </p>
          </div>
        </div>

        {/* Lucro Estimado */}
        <div 
          onClick={() => onNavigate('financeiro')}
          className="bg-white border border-slate-200 hover:border-slate-300 p-5 rounded-2xl shadow-xs transition-all cursor-pointer group"
          id="kpi-lucro"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Saldo em Caixa Estimado</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${netEstimatedProfit >= 0 ? 'bg-indigo-50 text-indigo-600' : 'bg-red-50 text-red-600'} group-hover:scale-110 transition-transform`}>
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className={`text-2xl font-bold font-mono ${netEstimatedProfit >= 0 ? 'text-indigo-600' : 'text-red-600'}`}>
              {formatBRL(netEstimatedProfit)}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Lucro líquido operacional previsto
            </p>
          </div>
        </div>

        {/* Produção Síntese */}
        <div 
          onClick={() => onNavigate('produção')}
          className="bg-white border border-slate-200 hover:border-slate-300 p-5 rounded-2xl shadow-xs transition-all cursor-pointer group"
          id="kpi-conteudo"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Conteúdos Ativos</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <h3 className="text-2xl font-bold text-slate-800 font-mono">
              {producingCount.length}
            </h3>
            <span className="text-xs text-amber-600 font-semibold uppercase tracking-wider">
              {scheduledCount.length} agendados
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Peças ativas no fluxo de conteúdo
          </p>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="dashboard-details-grid">
        
        {/* COL 1 & 2: Operational Flow and Commercials */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Conteúdo em Fluxo de Produção */}
          <div className="bg-white border border-slate-100 rounded-2xl card-shadow" id="dash-playing-production">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500 status-pulse" />
                <h2 className="font-semibold text-slate-800 font-display">Operação de Conteúdo Ativa ({producingCount.length})</h2>
              </div>
              <button 
                onClick={() => onNavigate('produção')}
                className="text-xs font-bold text-orange-500 hover:underline flex items-center gap-1 transition-colors"
              >
                Ver Kanban Completo <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="p-5 divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {producingCount.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-sm">
                  Sem conteúdos em andamento no momento.
                </div>
              ) : (
                producingCount.map((card) => (
                  <div key={card.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-sm">
                          {card.productName}
                        </span>
                        <span className="text-[10px] items-center px-1.5 py-0.5 rounded-sm font-semibold text-indigo-700 bg-indigo-50">
                          {card.stage}
                        </span>
                      </div>
                      <h4 className="text-sm font-medium text-slate-800 truncate">{card.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Resp: <span className="text-slate-700 font-medium">{card.responsible}</span> • Canal: <span className="font-medium text-slate-600">{card.channel}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[11px] font-semibold text-slate-400 block uppercase">Prazo</span>
                        <span className={`text-xs font-semibold ${card.deadline < currentSystemDate ? 'text-red-500 font-mono' : 'text-slate-600 font-mono'}`}>
                          {formatDateLabel(card.deadline)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pendências Comerciais */}
          <div className="bg-white border border-slate-100 rounded-2xl card-shadow" id="dash-commercial-leads">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-orange-500" />
                <h2 className="font-semibold text-slate-800 font-display">Negociações Comerciais Ativas ({commercialPendencies.length})</h2>
              </div>
              <button 
                onClick={() => onNavigate('comercial')}
                className="text-xs font-bold text-orange-500 hover:underline flex items-center gap-1 transition-colors"
                title="Ir para Comercial"
              >
                Gerenciar Funil <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="p-5 divide-y divide-slate-100">
              {commercialPendencies.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-sm">
                  Sem pendências e negociações em andamento.
                </div>
              ) : (
                commercialPendencies.map((lead) => (
                  <div key={lead.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-bold text-slate-900">{lead.client}</span>
                        <span className="text-[10px] px-2 py-0.5 font-medium rounded-full bg-slate-100 text-slate-700 capitalized">
                          {lead.type}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-md font-semibold bg-orange-50 text-orange-500">
                          {lead.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        <span className="font-medium text-slate-500">Próxima ação:</span> {lead.nextAction || 'Não especificada'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-5">
                      <div className="text-left md:text-right">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Valor</span>
                        <span className="text-xs font-bold text-orange-700 font-mono">
                          {formatBRL(lead.estimatedValue)}
                        </span>
                      </div>
                      <div className="text-left md:text-right">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Prazo Contato</span>
                        <span className="text-xs text-slate-600 font-mono">{formatDateLabel(lead.deadline)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* COL 3: Alert list: Tasks Overdue, Upcoming Shows & Releases */}
        <div className="space-y-6">
          
          {/* Tarefas Atrasadas & Alertas (Danilo / Sora / Risael / Rulio) */}
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5" id="dash-alerts">
            <div className="flex items-center gap-2 text-rose-600 mb-3">
              <div className="w-2 h-2 rounded-full bg-rose-500 status-pulse"></div>
              <h3 className="font-bold text-rose-600 font-display text-xs uppercase tracking-wider">Altas Prioridades & {allOverdueItemsCount} Atrasos</h3>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {allOverdueItemsCount === 0 ? (
                <div className="text-xs text-orange-700 bg-orange-50 rounded-xl p-3 border border-orange-100 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-500" />
                  <span>Todos os conteúdos e prazos internos estão em dia! Excelente trabalho.</span>
                </div>
              ) : (
                <>
                  {overdueContent.map((card) => (
                    <div key={card.id} className="bg-white border border-red-100 p-3 rounded-xl shadow-2xs flex gap-2 items-start">
                      <Clock className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold text-slate-800">[Conteúdo] {card.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Atrasado desde <span className="font-bold text-red-600 font-mono">{formatDateLabel(card.deadline)}</span> • Resp: <span className="font-semibold text-slate-700">{card.responsible}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                  {overdueEvents.map((e) => (
                    <div key={e.id} className="bg-white border border-red-100 p-3 rounded-xl shadow-2xs flex gap-2 items-start">
                      <Calendar className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold text-slate-800">[Prazo] {e.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Passou em <span className="font-bold text-red-600 font-mono">{formatDateLabel(e.date)}</span> • Resp: <span className="font-semibold text-slate-700">{e.responsible}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Próximos Shows & Oficinas */}
          <div className="bg-white border border-slate-100 rounded-2xl card-shadow" id="dash-shows">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-orange-500" />
                <h2 className="font-semibold text-slate-800 font-display">Próximas Agendas ({upcomingShows.length})</h2>
              </div>
              <button 
                onClick={() => onNavigate('calendário')}
                className="text-xs font-bold text-orange-500 hover:underline flex items-center gap-1 transition-colors"
              >
                Ver Agenda <ChevronRight className="w-3" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              {upcomingShows.length === 0 ? (
                <text className="text-center py-6 text-slate-400 text-sm block">Sem shows ou oficinas cadastrados.</text>
              ) : (
                upcomingShows.map((show) => {
                  const isOficina = show.type === 'oficina';
                  return (
                    <div key={show.id} className="flex gap-4 items-start group">
                      <div className={`w-12 h-12 rounded-xl shrink-0 flex flex-col items-center justify-center font-mono ${isOficina ? 'bg-indigo-50 border border-indigo-100 text-indigo-700' : 'bg-amber-50 border border-amber-100 text-amber-700'}`}>
                        <span className="text-[10px] font-bold block uppercase leading-none">
                          {isOficina ? 'Ofic' : 'Show'}
                        </span>
                        <span className="text-sm font-bold block leading-none mt-1">
                          {formatDateLabel(show.date).split('/')[0]}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-slate-800 group-hover:text-amber-600 transition-colors truncate">
                          {show.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          {show.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {show.time && (
                            <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-1 py-0.2 rounded-sm">
                              {show.time}
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400 font-medium">
                            Resp: {show.responsible}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Próximos Lançamentos & Posts */}
          <div className="bg-white border border-slate-100 rounded-2xl card-shadow" id="dash-releases">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-orange-500" />
                <h2 className="font-semibold text-slate-800 font-display">Próximas Postagens ({upcomingReleases.length})</h2>
              </div>
              <button 
                onClick={() => onNavigate('calendário')}
                className="text-xs font-bold text-orange-500 hover:underline flex items-center gap-1 transition-colors"
              >
                Calendário <ChevronRight className="w-3" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              {upcomingReleases.length === 0 ? (
                <p className="text-center py-6 text-slate-500 text-sm">Nenhum lançamento previsto.</p>
              ) : (
                upcomingReleases.map((rev) => {
                  const isDigitalRelease = rev.type === 'lancamento';
                  return (
                    <div key={rev.id} className="flex gap-4 items-start group">
                      <div className={`w-12 h-12 rounded-xl shrink-0 flex flex-col items-center justify-center font-mono ${isDigitalRelease ? 'bg-indigo-50 border border-indigo-150 text-indigo-700' : 'bg-orange-50 border border-orange-100 text-orange-600'}`}>
                        <span className="text-[9px] font-extrabold block uppercase leading-none">
                          {isDigitalRelease ? 'Lanç' : 'Post'}
                        </span>
                        <span className="text-sm font-bold block leading-none mt-1">
                          {formatDateLabel(rev.date).split('/')[0]}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-slate-800 group-hover:text-orange-500 transition-colors truncate">
                          {rev.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          {rev.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-slate-400 font-medium">
                            Por: {rev.responsible}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Status Financeiro & Metas */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 card-shadow" id="dash-fin-alerts">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status Financeiro (Junho)</h3>
            <div className="mt-4">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[10px] font-bold text-slate-600 font-display">Meta Mensal (R$ 40k)</span>
                <span className="text-[10px] font-bold text-orange-600">
                  {Math.min(100, Math.round((totalJuneRevenues / 40000) * 100))}%
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4">
                <div 
                  className="bg-orange-500 h-1.5 rounded-full transition-all" 
                  style={{ width: `${Math.min(100, Math.round((totalJuneRevenues / 40000) * 100))}%` }}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <p className="text-slate-450 mb-0.5 font-semibold">Receber Pendente</p>
                  <p className="font-bold text-slate-800 font-mono">{formatBRL(pendingReceivablesTotal)}</p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <p className="text-slate-450 mb-0.5 font-semibold">Pagar Pendente</p>
                  <p className="font-bold text-rose-500 font-mono">{formatBRL(pendingPayablesTotal)}</p>
                </div>
              </div>
              
              {pendingInvoices.length > 0 && (
                <div className="mt-3 text-[10px] bg-amber-50 rounded-lg p-2 text-amber-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                  <span>{pendingInvoices.length} Notas Fiscais pendentes de emissão.</span>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
