/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  DollarSign, 
  Activity, 
  CheckCircle, 
  X, 
  Trash2, 
  Edit, 
  ArrowLeft, 
  ArrowRight, 
  Briefcase, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  Layers,
  TrendingUp,
  Percent
} from 'lucide-react';
import { CommercialLead, CommercialStage, OpportunityType } from '../types';

interface CommercialViewProps {
  leads: CommercialLead[];
  onAddLead: (lead: Omit<CommercialLead, 'id'>) => void;
  onUpdateLead: (lead: CommercialLead) => void;
  onDeleteLead: (leadId: string) => void;
  teamMembers: string[];
}

const STAGES: CommercialStage[] = [
  'Lead',
  'Primeiro contato',
  'Proposta enviada',
  'Negociação',
  'Fechado',
  'Perdido'
];

const OPPORTUNITY_TYPES: { value: OpportunityType; label: string; color: string; bg: string }[] = [
  { value: 'show', label: 'Show', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  { value: 'oficina', label: 'Oficina Rítmica', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
  { value: 'palestra', label: 'Palestra Formativa', color: 'text-violet-700', bg: 'bg-violet-50 border-violet-200' },
  { value: 'projeto escolar', label: 'Projeto Escolar Anual', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  { value: 'parceria', label: 'Parcerias IP', color: 'text-slate-700', bg: 'bg-slate-50 border-slate-200' }
];

export default function CommercialView({
  leads,
  onAddLead,
  onUpdateLead,
  onDeleteLead,
  teamMembers
}: CommercialViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [responsibleFilter, setResponsibleFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Form modals state
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLead, setEditingLead] = useState<CommercialLead | null>(null);

  // New Lead fields
  const [client, setClient] = useState('');
  const [oppType, setOppType] = useState<OpportunityType>('show');
  const [estimatedValue, setEstimatedValue] = useState<number>(12000);
  const [responsible, setResponsible] = useState('Sora');
  const [nextAction, setNextAction] = useState('Telefonar para agendar alinhamento.');
  const [deadline, setDeadline] = useState('2026-06-25');
  const [status, setStatus] = useState<CommercialStage>('Lead');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  // 1. Funnel Metrics Calculations
  const activeLeads = leads.filter(l => l.status !== 'Fechado' && l.status !== 'Perdido');
  const totalPipelineValue = activeLeads.reduce((acc, l) => acc + l.estimatedValue, 0);
  
  const wonLeads = leads.filter(l => l.status === 'Fechado');
  const totalWonValue = wonLeads.reduce((acc, l) => acc + l.estimatedValue, 0);

  const lostLeads = leads.filter(l => l.status === 'Perdido');
  const totalLeadsEvaluated = wonLeads.length + lostLeads.length;
  const conversionRate = totalLeadsEvaluated > 0 
    ? Math.round((wonLeads.length / totalLeadsEvaluated) * 100) 
    : 0;

  // Move a lead left/right
  const shiftLeadStage = (lead: CommercialLead, direction: 'prev' | 'next') => {
    const currentIndex = STAGES.indexOf(lead.status);
    let newIndex = currentIndex;
    if (direction === 'prev' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction === 'next' && currentIndex < STAGES.length - 1) {
      newIndex = currentIndex + 1;
    }

    if (newIndex !== currentIndex) {
      onUpdateLead({
        ...lead,
        status: STAGES[newIndex]
      });
    }
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client) return;

    onAddLead({
      client,
      type: oppType,
      estimatedValue: Number(estimatedValue),
      responsible,
      nextAction,
      deadline,
      status,
      phone,
      email,
      notes
    });

    // Reset fields
    setClient('');
    setOppType('show');
    setEstimatedValue(12000);
    setResponsible('Sora');
    setNextAction('');
    setDeadline('2026-06-25');
    setStatus('Lead');
    setPhone('');
    setEmail('');
    setNotes('');
    setIsAdding(false);
  };

  const handleOpenEdit = (lead: CommercialLead) => {
    setEditingLead(lead);
    setIsEditing(true);
  };

  const handleUpdateLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLead) {
      onUpdateLead({
        ...editingLead,
        estimatedValue: Number(editingLead.estimatedValue)
      });
      setIsEditing(false);
      setEditingLead(null);
    }
  };

  const handleDeleteLead = (id: string) => {
    if (confirm('Deseja realmente remover permanentemente esta oportunidade do seu funil?')) {
      onDeleteLead(id);
      setIsEditing(false);
      setEditingLead(null);
    }
  };

  // Filter deals
  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.nextAction.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (l.notes && l.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesUser = responsibleFilter === 'all' || l.responsible === responsibleFilter;
    const matchesType = typeFilter === 'all' || l.type === typeFilter;
    return matchesSearch && matchesUser && matchesType;
  });

  const getOppTypeLabel = (type: OpportunityType) => {
    const found = OPPORTUNITY_TYPES.find(o => o.value === type);
    return found ? found.label : type;
  };

  const getOppTypeStyle = (type: OpportunityType) => {
    const found = OPPORTUNITY_TYPES.find(o => o.value === type);
    return found ? `${found.bg} ${found.color}` : 'bg-slate-100 text-slate-800';
  };

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(val);
  };

  const getStageColumnColor = (stage: CommercialStage) => {
    switch (stage) {
      case 'Lead': return 'border-t-4 border-t-slate-400 bg-slate-50';
      case 'Primeiro contato': return 'border-t-4 border-t-sky-400 bg-sky-50/10';
      case 'Proposta enviada': return 'border-t-4 border-t-teal-400 bg-teal-50/10';
      case 'Negociação': return 'border-t-4 border-t-amber-400 bg-amber-50/10';
      case 'Fechado': return 'border-t-4 border-t-orange-500 bg-orange-50/10';
      case 'Perdido': return 'border-t-4 border-t-rose-400 bg-rose-50/10';
    }
  };

  return (
    <div className="space-y-6" id="commercial-container">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display text-slate-800">
            Comercial & Funil de Vendas
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Controle e tração de novos shows, oficinas, propostas escolares e palestras institucionais da equipe Batucadan.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-colors self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Nova Oportunidade
        </button>
      </div>

      {/* KPI Panel Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="commercial-kpi">
        {/* Pipeline Estimativo */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4.5 flex items-center gap-4 card-shadow">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Pipeline Ativo</span>
            <span className="text-xl font-bold font-mono text-slate-800">{formatBRL(totalPipelineValue)}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">{activeLeads.length} propostas ativas</span>
          </div>
        </div>

        {/* Faturamento Ganho */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4.5 flex items-center gap-4 card-shadow">
          <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Fechados no Mês</span>
            <span className="text-xl font-bold font-mono text-slate-800">{formatBRL(totalWonValue)}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">{wonLeads.length} contratos assinados</span>
          </div>
        </div>

        {/* Taxa de Conversão */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4.5 flex items-center gap-4 card-shadow">
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Taxa de Conversão</span>
            <span className="text-xl font-bold font-mono text-slate-800">{conversionRate}%</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Média histórico comercial</span>
          </div>
        </div>

        {/* Total Oportunidades registradas */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4.5 flex items-center gap-4 card-shadow">
          <div className="w-10 h-10 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Lead Inteligente</span>
            <span className="text-xl font-bold font-mono text-slate-800">{leads.length} cadastradas</span>
            <span className="text-[10px] text-orange-550 font-semibold block mt-0.5">Sora líder comercial</span>
          </div>
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
        {/* Search */}
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar por cliente, notas fiscais ou ações comerciais..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-slate-50/50 text-slate-700"
          />
        </div>

        {/* Responsible Filter */}
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-2.5">
          <User className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
          <select
            value={responsibleFilter}
            onChange={(e) => setResponsibleFilter(e.target.value)}
            className="w-full text-xs py-2 bg-transparent border-0 focus:ring-0 text-slate-600 font-semibold"
          >
            <option value="all">Vendedor: Todos</option>
            {teamMembers.map(tm => (
              <option key={tm} value={tm}>{tm}</option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-2.5">
          <Briefcase className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full text-xs py-2 bg-transparent border-0 focus:ring-0 text-slate-600 font-semibold"
          >
            <option value="all">Filtro: Todos canais</option>
            {OPPORTUNITY_TYPES.map(op => (
              <option key={op.value} value={op.value}>{op.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Funnel Columns Flow (horizontal-scroll list board) */}
      <div className="flex overflow-x-auto gap-4 pb-6 scrollbar-thin" id="comercial-funnel-cols">
        {STAGES.map(stage => {
          const stageDeals = filteredLeads.filter(l => l.status === stage);
          const stageValueSum = stageDeals.reduce((acc, l) => acc + l.estimatedValue, 0);

          return (
            <div 
              key={stage} 
              className={`min-w-[280px] max-w-[310px] flex-1 rounded-2xl border border-slate-200 shadow-3xs flex flex-col max-h-[640px] bg-slate-100/30 ${getStageColumnColor(stage)}`}
            >
              {/* Header */}
              <div className="p-3.5 border-b border-slate-200 flex items-center justify-between bg-white/70">
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-800 text-xs font-display truncate pr-2">{stage}</h3>
                  <span className="text-[10px] text-slate-400 font-mono font-bold block mt-0.5">
                    {stageDeals.length} deals • <span className="text-slate-600">{formatBRL(stageValueSum)}</span>
                  </span>
                </div>
              </div>

              {/* Deals Flow content */}
              <div className="p-3.5 space-y-3 overflow-y-auto flex-1 min-h-[350px]">
                {stageDeals.length === 0 ? (
                  <div className="border border-dashed border-slate-200 rounded-xl py-10 text-center text-[11px] text-slate-400 bg-white/20">
                    Nenhum cliente nesta etapa.
                  </div>
                ) : (
                  stageDeals.map(deal => (
                    <div 
                      key={deal.id} 
                      className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 shadow-3xs hover:shadow-2xs transition-all relative flex flex-col justify-between group"
                    >
                      <div>
                        {/* Client & Type Badge */}
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className={`text-[8.5px] font-bold border rounded-md px-1.5 py-0.2 uppercase font-sans ${getOppTypeStyle(deal.type)}`}>
                            {getOppTypeLabel(deal.type)}
                          </span>
                          <span className="text-xs font-bold text-slate-800 font-mono">
                            {formatBRL(deal.estimatedValue)}
                          </span>
                        </div>

                        {/* Client Name */}
                        <h4 className="text-xs font-extrabold text-slate-900 mb-1 leading-tight">{deal.client}</h4>

                        {/* Contacts */}
                        {(deal.phone || deal.email) && (
                          <div className="space-y-0.5 mb-2 border-b border-slate-50 pb-2">
                            {deal.phone && (
                              <div className="flex items-center gap-1 text-[9.5px] text-slate-500">
                                <Phone className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                                <span>{deal.phone}</span>
                              </div>
                            )}
                            {deal.email && (
                              <div className="flex items-center gap-1 text-[9.5px] text-slate-500">
                                <Mail className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                                <span className="truncate">{deal.email}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Action details */}
                        <div className="bg-slate-50 p-2 rounded-lg text-[10.5px] text-slate-600 leading-snug font-sans mb-3 border border-slate-100">
                          <span className="text-[8.5px] font-bold uppercase tracking-wider text-emerald-700 block mb-0.5">PRÓXIMA AÇÃO:</span>
                          "{deal.nextAction || 'Não desenhada'}"
                        </div>
                      </div>

                      {/* Footer block */}
                      <div className="flex items-center justify-between border-t border-slate-50 pt-2 text-[10.5px] shrink-0">
                        <div className="flex items-center gap-1 text-slate-500 font-mono text-[10px]">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{deal.deadline.split('-').reverse().slice(0,2).join('/')}</span>
                        </div>
                        <span className="text-slate-500 font-semibold">Dono: <span className="text-slate-800 font-bold">{deal.responsible}</span></span>

                        {/* Small moves control */}
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1 shrink-0 bg-white border border-slate-100 rounded-md p-0.5">
                          <button
                            onClick={() => handleOpenEdit(deal)}
                            className="p-1 hover:bg-slate-100 text-slate-500 rounded"
                            title="Editar Oportunidade"
                          >
                            <Edit className="w-2.5 h-2.5" />
                          </button>
                          
                          <button
                            onClick={() => shiftLeadStage(deal, 'prev')}
                            disabled={STAGES.indexOf(deal.status) === 0}
                            className="p-1 disabled:opacity-25 hover:bg-slate-100 text-slate-500 rounded"
                          >
                            <ArrowLeft className="w-2.5 h-2.5" />
                          </button>

                          <button
                            onClick={() => shiftLeadStage(deal, 'next')}
                            disabled={STAGES.indexOf(deal.status) === STAGES.length - 1}
                            className="p-1 disabled:opacity-25 hover:bg-slate-100 text-slate-500 rounded"
                          >
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL 1: ADD NEW COMMERCIAL OPPORTUNITY */}
      {isAdding && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-150 pb-3">
              <h3 className="font-bold text-slate-800 text-lg font-display">Adicionar Oportunidade Comercial</h3>
              <button
                onClick={() => setIsAdding(false)}
                className="p-1 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-705 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Nome do Cliente / Instituição</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Prefeitura de São Bernardo"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Tipo de Serviço</label>
                  <select
                    value={oppType}
                    onChange={(e) => setOppType(e.target.value as OpportunityType)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                  >
                    {OPPORTUNITY_TYPES.map(op => (
                      <option key={op.value} value={op.value}>{op.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Valor Estimado (Cachê)</label>
                  <input
                    type="number"
                    required
                    placeholder="Valor em R$"
                    value={estimatedValue}
                    onChange={(e) => setEstimatedValue(Number(e.target.value))}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Responsável Comercial</label>
                  <select
                    value={responsible}
                    onChange={(e) => setResponsible(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                  >
                    {teamMembers.map(tm => (
                      <option key={tm} value={tm}>{tm}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Estágio no Funil</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as CommercialStage)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                  >
                    {STAGES.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Telefone Contato</label>
                  <input
                    type="text"
                    placeholder="Ex: (11) 98765-4321"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">E-mail</label>
                  <input
                    type="email"
                    placeholder="compras@prefeitura.gov.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Prazo Próxima Ação</label>
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Próxima Ação Imediata</label>
                  <input
                    type="text"
                    placeholder="Enviar portfólio completo com NFs anteriores"
                    value={nextAction}
                    onChange={(e) => setNextAction(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Notas e briefing adicionais</label>
                <textarea
                  rows={2}
                  placeholder="Informações do edital, exigências fiscais particulares do município..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2"
                />
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100 font-sans">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors"
                >
                  Salvar Oportunidade
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-650 font-bold text-xs px-4"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT COMMERCIAL OPPORTUNITY */}
      {isEditing && editingLead && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-150 pb-3">
              <h3 className="font-bold text-slate-800 text-md font-display flex items-center gap-1.5">
                <Edit className="w-4 h-4 text-emerald-600" /> Editar Oportunidade
              </h3>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleDeleteLead(editingLead.id)}
                  className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                  title="Remover de vez"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setIsEditing(false); setEditingLead(null); }}
                  className="p-1 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdateLeadSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Cliente</label>
                <input
                  type="text"
                  required
                  value={editingLead.client}
                  onChange={(e) => setEditingLead({ ...editingLead, client: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Tipo de Serviço</label>
                  <select
                    value={editingLead.type}
                    onChange={(e) => setEditingLead({ ...editingLead, type: e.target.value as OpportunityType })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                  >
                    {OPPORTUNITY_TYPES.map(op => (
                      <option key={op.value} value={op.value}>{op.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Cachê / Valor Estimado (R$)</label>
                  <input
                    type="number"
                    required
                    value={editingLead.estimatedValue}
                    onChange={(e) => setEditingLead({ ...editingLead, estimatedValue: Number(e.target.value) })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Responsável</label>
                  <select
                    value={editingLead.responsible}
                    onChange={(e) => setEditingLead({ ...editingLead, responsible: e.target.value })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                  >
                    {teamMembers.map(tm => (
                      <option key={tm} value={tm}>{tm}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Etapa de Vendas</label>
                  <select
                    value={editingLead.status}
                    onChange={(e) => setEditingLead({ ...editingLead, status: e.target.value as CommercialStage })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                  >
                    {STAGES.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Contato Telefônico</label>
                  <input
                    type="text"
                    value={editingLead.phone || ''}
                    onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">E-mail</label>
                  <input
                    type="email"
                    value={editingLead.email || ''}
                    onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Prazo Próxima Ação</label>
                  <input
                    type="date"
                    required
                    value={editingLead.deadline}
                    onChange={(e) => setEditingLead({ ...editingLead, deadline: e.target.value })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Próxima Ação</label>
                  <input
                    type="text"
                    required
                    value={editingLead.nextAction}
                    onChange={(e) => setEditingLead({ ...editingLead, nextAction: e.target.value })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Anotações Gerais</label>
                <textarea
                  rows={2}
                  value={editingLead.notes || ''}
                  onChange={(e) => setEditingLead({ ...editingLead, notes: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2"
                />
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors"
                >
                  Salvar Edição Comercial
                </button>
                <button
                  type="button"
                  onClick={() => { setIsEditing(false); setEditingLead(null); }}
                  className="bg-slate-100 text-slate-600 font-bold text-xs px-4"
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
