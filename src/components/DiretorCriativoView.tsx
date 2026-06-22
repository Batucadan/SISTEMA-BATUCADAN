import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  XOctagon, 
  FileText, 
  Music, 
  Rocket, 
  HeartHandshake, 
  CornerDownRight, 
  Plus, 
  Trash2, 
  Calendar,
  Volume2,
  Tv,
  ArrowUpRight
} from 'lucide-react';
import { CreativeApproval } from '../types';

interface DiretorCriativoViewProps {
  approvals: CreativeApproval[];
  onUpdateStatus: (id: string, newStatus: 'Aprovado' | 'Recusado' | 'Pendente') => void;
  onAddApproval?: (approval: Omit<CreativeApproval, 'id'>) => void;
  onDeleteApproval?: (id: string) => void;
  teamMembers: string[];
}

export default function DiretorCriativoView({ approvals, onUpdateStatus, onAddApproval, onDeleteApproval, teamMembers }: DiretorCriativoViewProps) {
  const [filterType, setFilterType] = useState<string>('all');
  const [isAddingIdea, setIsAddingIdea] = useState(false);
  
  // New Idea / Suggestion form States
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'Roteiro' | 'Música' | 'Arte/Animação' | 'Proposta Comercial' | 'Novo Produto'>('Roteiro');
  const [newProdName, setNewProdName] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newContentRef, setNewContentRef] = useState('');
  const [newRequestedBy, setNewRequestedBy] = useState('Danilo');

  const filteredApprovals = approvals.filter(ap => {
    return filterType === 'all' || ap.type === filterType;
  });

  const handleCreateIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newNotes) {
      alert('Por favor, defina um Título e a Descrição da ideia criativa.');
      return;
    }

    if (onAddApproval) {
      onAddApproval({
        title: newTitle,
        type: newType,
        productName: newProdName || 'Geral',
        requestedBy: newRequestedBy,
        date: new Date().toISOString().split('T')[0],
        status: 'Pendente',
        notes: newNotes,
        contentReference: newContentRef || 'Roteiro ou escopo rítmico conceitual.'
      });
      alert('Ideia Criativa / Projeto Estratégico registrado na esteira!');
      setIsAddingIdea(false);
      setNewTitle('');
      setNewNotes('');
      setNewContentRef('');
      setNewProdName('');
    }
  };

  const getApprovalTypeIcon = (type: string) => {
    switch (type) {
      case 'Roteiro':
        return <FileText className="w-4 h-4 text-orange-500" />;
      case 'Música':
        return <Music className="w-4 h-4 text-violet-500" />;
      case 'Arte/Animação':
        return <Sparkles className="w-4 h-4 text-indigo-500" />;
      case 'Proposta Comercial':
        return <HeartHandshake className="w-4 h-4 text-emerald-500" />;
      case 'Novo Produto':
        return <Rocket className="w-4 h-4 text-amber-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6" id="view-diretor-criativo">
      {/* Header section restricted to Danilo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[10px] bg-violet-100 text-violet-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            Painel Exclusivo • Danilo (Fundador)
          </span>
          <h1 className="text-3xl font-bold font-display tracking-tight text-slate-800 mt-1">
            Mesa do Diretor Criativo
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Foco integral na concepção do ecossistema, revisão de roteiros, aprovações de áudio e novos produtos. Zero barulho operacional.
          </p>
        </div>

        <button
          onClick={() => setIsAddingIdea(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2 shadow-xs transition-colors self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Registrar Roteiro / Ideia
        </button>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Metric pending */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 flex items-center gap-4 shadow-3xs">
          <div className="p-3 bg-orange-100/60 rounded-xl text-orange-600">
            <Clock className="w-5 h-5 flex animate-pulse" />
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 block font-display">Aprovações Pendentes</span>
            <span className="text-2xl font-extrabold font-mono text-slate-800">
              {approvals.filter(a => a.status === 'Pendente').length} Frentes
            </span>
          </div>
        </div>

        {/* Metric Approved */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 flex items-center gap-4 shadow-3xs">
          <div className="p-3 bg-emerald-100/60 rounded-xl text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 block font-display">Itens Aprovados</span>
            <span className="text-2xl font-extrabold font-mono text-slate-800">
              {approvals.filter(a => a.status === 'Aprovado').length} Concluídos
            </span>
          </div>
        </div>

        {/* Strategic Ideas count */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 flex items-center gap-4 shadow-3xs">
          <div className="p-3 bg-violet-100/60 rounded-xl text-violet-600">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 block font-display">Novas Concepções</span>
            <span className="text-2xl font-extrabold font-mono text-slate-800">
              {approvals.filter(a => a.type === 'Novo Produto' || a.type === 'Proposta Comercial').length} Projetos
            </span>
          </div>
        </div>

      </div>

      {/* Main Approval Panel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 flex-wrap gap-2">
          <div>
            <h3 className="font-bold text-slate-800 text-sm font-display uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-4.5 h-4.5 text-violet-600" />
              Esteira Estratégica de Aprovação
            </h3>
            <p className="text-[10px] text-slate-450 mt-0.5">Analise roteiros, áudios e escopos enviadas pela equipe.</p>
          </div>

          {/* Quick Types Filters */}
          <div className="flex bg-slate-100 border border-slate-200 p-1 rounded-xl gap-0.5 shadow-3xs max-w-full overflow-x-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                filterType === 'all' ? 'bg-white text-slate-800' : 'text-slate-500'
              }`}
            >
              Todos ({approvals.length})
            </button>
            {['Roteiro', 'Música', 'Arte/Animação', 'Proposta Comercial', 'Novo Produto'].map(tp => (
              <button
                key={tp}
                onClick={() => setFilterType(tp)}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap ${
                  filterType === tp ? 'bg-white text-slate-800' : 'text-slate-500'
                }`}
              >
                {tp}
              </button>
            ))}
          </div>
        </div>

        {/* Approval Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredApprovals.map(ap => (
            <div 
              key={ap.id} 
              className={`bg-white border rounded-3xl p-5 shadow-2xs flex flex-col justify-between relative overflow-hidden transition-all ${
                ap.status === 'Aprovado' 
                  ? 'border-emerald-100 bg-emerald-500/1' 
                  : ap.status === 'Recusado' ? 'border-red-100 bg-red-500/1' : 'border-slate-200'
              }`}
            >
              <div>
                {/* Card Top */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-50 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <span className="p-1 bg-slate-50 border border-slate-200/50 rounded-lg">
                      {getApprovalTypeIcon(ap.type)}
                    </span>
                    <span className="font-extrabold text-slate-500 font-display uppercase tracking-wide">
                      {ap.type} • {ap.productName}
                    </span>
                  </div>

                  {/* Status Indicator Badge */}
                  <span className={`font-bold font-mono px-2 py-0.5 rounded ${
                    ap.status === 'Aprovado' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : ap.status === 'Recusado' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {ap.status}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-sm font-bold text-slate-850 mt-3 font-display tracking-tight leading-tight uppercase">
                  {ap.title}
                </h4>

                {/* Notes */}
                <div className="mt-3.5 bg-slate-50/70 border border-slate-100 p-3 rounded-xl">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold block">Contexto / Justificativa:</span>
                  <p className="text-[11px] text-slate-650 leading-relaxed mt-1">
                    {ap.notes}
                  </p>
                </div>

                {/* Content Reference */}
                <div className="mt-3 text-[10.5px] text-slate-500 pl-2 border-l-2 border-indigo-500 leading-relaxed">
                  <strong>Referência Criativa:</strong> {ap.contentReference}
                </div>

                {/* Submited details */}
                <div className="mt-4 flex items-center justify-between gap-2 text-[9.5px] text-slate-400 font-mono">
                  <span>Sugerido por: <strong>{ap.requestedBy}</strong></span>
                  <span>Data: {ap.date}</span>
                </div>
              </div>

              {/* Action Buttons to click approve/decline */}
              <div className="pt-4 border-t border-slate-100 mt-5 flex items-center justify-between gap-2.5">
                {ap.status === 'Pendente' ? (
                  <div className="flex gap-2 w-full">
                    <button
                      onClick={() => onUpdateStatus(ap.id, 'Recusado')}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-[10px] py-2 rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      <XOctagon className="w-3.5 h-3.5" /> Rejeitar
                    </button>
                    <button
                      onClick={() => onUpdateStatus(ap.id, 'Aprovado')}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] py-2 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Aprovar Ativo
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between w-full text-[10px] text-slate-400 items-center">
                    <span>Decisão gravada</span>
                    <button
                      onClick={() => onUpdateStatus(ap.id, 'Pendente')}
                      className="text-slate-400 hover:text-indigo-600 font-semibold underline underline-offset-2"
                    >
                      Reverter para Pendente
                    </button>
                  </div>
                )}

                {onDeleteApproval && (
                  <button
                    onClick={() => {
                      if (confirm(`Deseja mesmo remover permanentemente este item criativo de aprovação?`)) {
                        onDeleteApproval(ap.id);
                      }
                    }}
                    className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors shrink-0"
                    title="Remover Item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>
          ))}

          {filteredApprovals.length === 0 && (
            <div className="bg-white border border-slate-200 text-center py-10 rounded-3xl p-5 md:col-span-2">
              <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-600">Nenhum pedido de aprovação registrado nessa categoria</p>
              <p className="text-[10px] text-slate-400 mt-1">Sua mesa está limpa de interferências para este tipo de ativo!</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Idea / Approval draft overlay */}
      {isAddingIdea && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-sm w-full p-6 space-y-4 shadow-sm select-none">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wide font-display flex items-center gap-1.5">
                <Rocket className="w-4 h-4 text-orange-600" />
                Registrar Nova Ideia / Projeto
              </h3>
              <button 
                onClick={() => setIsAddingIdea(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold px-1"
              >
                X
              </button>
            </div>

            <form onSubmit={handleCreateIdea} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Título da Ideia / Roteiro *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Roteiro Especial Dia das Crianças"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2.5 focus:border-indigo-500 text-slate-700 font-display font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Tipo de Ativo</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:border-indigo-500 text-slate-650 font-semibold"
                  >
                    <option value="Roteiro">Roteiro</option>
                    <option value="Música">Música</option>
                    <option value="Arte/Animação">Arte/Animação</option>
                    <option value="Proposta Comercial">Proposta Comercial</option>
                    <option value="Novo Produto">Novo Produto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Linha de Produto</label>
                  <input
                    type="text"
                    placeholder="Ex: YouTube ou Shows"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2.5 focus:border-indigo-500 text-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Proponente</label>
                <select
                  value={newRequestedBy}
                  onChange={(e) => setNewRequestedBy(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50 focus:border-indigo-500 text-slate-650"
                >
                  {teamMembers.map(tm => (
                    <option key={tm} value={tm}>{tm}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Contextualização / Notas *</label>
                <textarea
                  required
                  placeholder="Por que este projeto é relevante agora?"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2.5 focus:border-indigo-500 h-14 text-slate-650"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Referência Criativa Básica</label>
                <textarea
                  placeholder="Digite ideias do enredo, instrumentação, ou acordos..."
                  value={newContentRef}
                  onChange={(e) => setNewContentRef(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2.5 focus:border-indigo-500 h-14 text-slate-650"
                />
              </div>

              <div className="flex gap-2.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddingIdea(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2 rounded-xl transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-xl transition-all"
                >
                  Registrar Ideia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
