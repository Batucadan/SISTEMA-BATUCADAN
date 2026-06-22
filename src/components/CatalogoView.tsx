import React, { useState } from 'react';
import { 
  Search, 
  Layers, 
  Workflow, 
  Award, 
  Compass, 
  TrendingUp, 
  ArrowRight, 
  DollarSign, 
  HeartHandshake, 
  Shuffle, 
  CornerDownRight, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Trash2,
  Calendar
} from 'lucide-react';
import { Product, PillarId } from '../types';

interface CatalogoViewProps {
  products: Product[];
  onAddProduct?: (product: Omit<Product, 'id'>) => void;
  onDeleteProduct?: (id: string) => void;
  teamMembers: string[];
}

export default function CatalogoView({ products, onAddProduct, onDeleteProduct, teamMembers }: CatalogoViewProps) {
  const [activeTab, setActiveTab] = useState<'catalogo' | 'biblioteca'>('catalogo');
  const [searchQuery, setSearchQuery] = useState('');
  const [pillarFilter, setPillarFilter] = useState<string>('all');
  
  // New Product Modal State
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPillar, setNewPillar] = useState<PillarId>('entretenimento');
  const [newObjective, setNewObjective] = useState('');
  const [newChannel, setNewChannel] = useState('');
  const [newFrequency, setNewFrequency] = useState('');
  const [newResponsible, setNewResponsible] = useState(teamMembers[0] || 'Danilo');
  const [newKpi, setNewKpi] = useState('');
  const [newRevenueType, setNewRevenueType] = useState<'Direta' | 'Indireta' | 'Mista'>('Direta');
  const [newDirectRev, setNewDirectRev] = useState('');
  const [newIndirectRev, setNewIndirectRev] = useState('');
  const [newFluxoString, setNewFluxoString] = useState('Etapa 1, Etapa 2, Etapa 3');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.objective.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPillar = pillarFilter === 'all' || p.pillarId === pillarFilter;
    return matchesSearch && matchesPillar;
  });

  // Flowchart models mapping (Module 3)
  const processFlows = [
    {
      name: 'Videoclipe Comercial',
      steps: ['Ideia', 'Composição', 'Roteiro', 'Produção', 'Edição', 'Thumbnail', 'Upload', 'Estreia/Publicado'],
      color: 'border-orange-200 bg-orange-50 text-orange-700 font-bold',
      desc: 'Esteira de alto impacto visual e apelo social. Lançado bimestralmente para impulsionar visualizações e credibilidade de shows.'
    },
    {
      name: 'Shorts Kids (Vídeos Rápidos)',
      steps: ['Seleção de Corte', 'Edição Ágil', 'Inserção de Legenda e Efeitos', 'Upload de Arquivo', 'Agendamento em Canais', 'Publicado'],
      color: 'border-violet-200 bg-violet-50 text-violet-700 font-bold',
      desc: 'Geração ágil de visualizações e retenção rápida de espectadores. Frequência recorrente de até 3x por semana.'
    },
    {
      name: 'Apresentação: Show',
      steps: ['Lead Comercial / Interesse', 'Apresentação da Proposta', 'Assinatura do Contrato', 'Fixar Agenda', 'Produção de Logística', 'Execução / Show ao Vivo', 'Pós-venda / Pesquisa'],
      color: 'border-amber-200 bg-amber-50 text-amber-700 font-bold',
      desc: 'Nossa maior e mais rentável fonte de receita direta física. Exige rigorosa checagem de logística para não cansar o fundador.'
    },
    {
      name: 'Oficina Rítmica Pedagógica',
      steps: ['Prospecção / Venda', 'Planejamento de Roteiro', 'Preparação de Materiais', 'Execução Ativa Escolar', 'Relatório de Feedback'],
      color: 'border-emerald-200 bg-emerald-50 text-emerald-700 font-bold',
      desc: 'Método Educar pelo Brincar entregue diretamente aos alunos de escolas públicas e particulares, fortalecendo contratos anuais.'
    }
  ];

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newObjective) {
      alert('Por favor, preencha o Nome e Objetivo do produto.');
      return;
    }

    if (onAddProduct) {
      onAddProduct({
        name: newName,
        pillarId: newPillar,
        objective: newObjective,
        channel: newChannel || 'Não especificado',
        frequency: newFrequency || 'Contínuo',
        responsible: newResponsible,
        status: 'Em Planejamento',
        revenueType: newRevenueType,
        revenueSourceDescription: `Direta: ${newDirectRev || 'N/A'}. Indireta: ${newIndirectRev || 'N/A'}.`,
        kpiPrincipal: newKpi || 'Conversão',
        receitaDireta: newDirectRev || 'N/A',
        receitaIndireta: newIndirectRev || 'N/A',
        fluxo: newFluxoString.split(',').map(s => s.trim()).filter(Boolean)
      });

      alert('Produto cadastrado com sucesso!');
      setIsAdding(false);
      setNewName('');
      setNewObjective('');
      setNewChannel('');
      setNewFrequency('');
      setNewKpi('');
      setNewDirectRev('');
      setNewIndirectRev('');
    }
  };

  return (
    <div className="space-y-6" id="view-catalogo">
      {/* Tab Header with Segment Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            Portfólio de Negócios v2
          </span>
          <h1 className="text-3xl font-bold font-display tracking-tight text-slate-800 mt-1">
            Produtos e Processos
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Diferencie a receita de cada produto, verifique KPIs e estruture fluxos padronizados de trabalho.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-100 border border-slate-200 p-1 rounded-xl shrink-0 self-start md:self-auto shadow-2xs">
          <button
            onClick={() => setActiveTab('catalogo')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'catalogo'
                ? 'bg-white text-slate-800 shadow-xs ring-1 ring-slate-900/5'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Catálogo ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('biblioteca')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'biblioteca'
                ? 'bg-white text-slate-800 shadow-xs ring-1 ring-slate-900/5'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            Biblioteca de Processos
          </button>
        </div>
      </div>

      {activeTab === 'catalogo' ? (
        <div className="space-y-6 animate-fadeIn">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row gap-3.5 justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Pesquisar produto pelo nome ou objetivo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white text-slate-700"
              />
            </div>

            {/* Pillar Selector & Add button */}
            <div className="flex items-center gap-3.5 shrink-0">
              <select
                value={pillarFilter}
                onChange={(e) => setPillarFilter(e.target.value)}
                className="text-xs font-semibold border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-600 focus:border-indigo-500"
              >
                <option value="all">Pilar: Todos</option>
                <option value="entretenimento">Entretenimento</option>
                <option value="formativo">Formativo</option>
                <option value="pedagogico">Pedagógico</option>
              </select>

              <button
                onClick={() => setIsAdding(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                Novo Produto
              </button>
            </div>
          </div>

          {/* Products Spec Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(p => {
              const pTypeColor = p.pillarId === 'entretenimento' ? 'border-orange-100 bg-orange-500/5' : p.pillarId === 'formativo' ? 'border-violet-100 bg-violet-500/5' : 'border-emerald-100 bg-emerald-500/5';
              return (
                <div 
                  key={p.id} 
                  className={`bg-white border rounded-3xl p-5 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between relative overflow-hidden group ${pTypeColor}`}
                >
                  <div>
                    {/* Header line with badge and status */}
                    <div className="flex items-center justify-between gap-1.5 pb-2.5 border-b border-slate-100">
                      <span className={`text-[9px] uppercase tracking-wide px-2.5 py-0.5 rounded-full font-extrabold ${
                        p.pillarId === 'entretenimento' 
                          ? 'bg-orange-50 text-orange-700 border border-orange-150' 
                          : p.pillarId === 'formativo' ? 'bg-violet-50 text-violet-700 border border-violet-150' : 'bg-emerald-50 text-emerald-700 border border-emerald-150'
                      }`}>
                        {p.pillarId}
                      </span>
                      <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-md ${
                        p.status === 'Ativo' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {p.status}
                      </span>
                    </div>

                    {/* Product Name & details */}
                    <h3 className="text-md font-bold font-display text-slate-800 mt-3 group-hover:text-orange-500 transition-colors uppercase tracking-tight">
                      {p.name}
                    </h3>

                    {/* Objective explanation */}
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                      <strong>Objetivo:</strong> {p.objective}
                    </p>

                    {/* Product Specific Specs */}
                    <div className="grid grid-cols-2 gap-2.5 border-t border-slate-100 pt-3.5 mt-4 text-[10px]">
                      <div>
                        <span className="text-slate-400 block font-semibold">Frequência</span>
                        <span className="font-bold text-slate-700 block mt-0.5">{p.frequency}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold">Canal de Entrega</span>
                        <span className="font-bold text-slate-700 block mt-0.5 truncate">{p.channel}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold">KPI Principal</span>
                        <span className="font-semibold text-indigo-600 block mt-0.5 truncate">{p.kpiPrincipal || 'Visualizações'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold">Responsável</span>
                        <span className="font-bold text-slate-800 block mt-0.5">{p.responsible}</span>
                      </div>
                    </div>

                    {/* Monetization / Revenue Split (Direct/Indirect) */}
                    <div className="bg-slate-50/80 border border-slate-100 p-3 rounded-xl space-y-1.5 mt-4 text-[10px]">
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-semibold flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Receita Direta
                        </span>
                        <span className="font-bold text-emerald-600 truncate max-w-[120px]" title={p.receitaDireta || p.revenueSourceDescription}>
                          {p.receitaDireta || 'Cachês / Vendas'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-semibold flex items-center gap-1">
                          <HeartHandshake className="w-3.5 h-3.5 text-orange-500 shrink-0" /> Receita Indireta
                        </span>
                        <span className="font-bold text-orange-700 truncate max-w-[120px]" title={p.receitaIndireta || 'Branding / Shows subsequent'}>
                          {p.receitaIndireta || 'Autoridade e Tráfego'}
                        </span>
                      </div>
                    </div>

                    {/* Associated sequence stage list flow */}
                    {p.fluxo && p.fluxo.length > 0 && (
                      <div className="space-y-1 mt-4 pt-3.5 border-t border-slate-100">
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold block">Fluxo Operativo:</span>
                        <div className="flex flex-wrap gap-1 items-center mt-1">
                          {p.fluxo.map((st, sidx) => (
                            <React.Fragment key={sidx}>
                              <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                                {st}
                              </span>
                              {sidx < p.fluxo!.length - 1 && (
                                <span className="text-[9px] text-slate-300">→</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {onDeleteProduct && (
                    <div className="pt-4 mt-3 flex justify-end">
                      <button
                        onClick={() => {
                          if (confirm(`Deseja mesmo arquivar/remover o produto "${p.name}" do portfólio estratégico?`)) {
                            onDeleteProduct(p.id);
                          }
                        }}
                        className="text-slate-400 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition-colors"
                        title="Arquivar Produto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Fallback empty message */}
          {filteredProducts.length === 0 && (
            <div className="bg-white border border-slate-200 text-center py-12 rounded-3xl p-6">
              <Compass className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-600">Nenhum produto estratégico encontrado</p>
              <p className="text-[10px] text-slate-400 mt-1">Limpe ou ajuste os filtros para ver conteúdos.</p>
            </div>
          )}

          {/* Add Product Modal Overlay */}
          {isAdding && (
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 space-y-4 my-8 max-h-[90vh] overflow-y-auto card-shadow">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide font-display">
                    Cadastrar Novo Produto Estratégico
                  </h3>
                  <button 
                    onClick={() => setIsAdding(false)}
                    className="text-slate-400 hover:text-slate-600 text-xs font-extrabold px-1"
                  >
                    X
                  </button>
                </div>

                <form onSubmit={handleCreateProduct} className="space-y-4 text-xs select-none">
                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Nome do Produto *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Shorts Kids"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded-xl p-2.5 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Pilar de Encaixe *</label>
                      <select
                        value={newPillar}
                        onChange={(e) => setNewPillar(e.target.value as PillarId)}
                        className="w-full text-xs border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:border-indigo-500"
                      >
                        <option value="entretenimento">Entretenimento</option>
                        <option value="formativo">Formativo</option>
                        <option value="pedagogico">Pedagógico</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-500 font-semibold mb-1">Objetivos Corporativos do Produto *</label>
                    <textarea
                      required
                      placeholder="Qual o objetivo desse produto? Ex: Audiência rápida e retenção de inscritos."
                      value={newObjective}
                      onChange={(e) => setNewObjective(e.target.value)}
                      className="w-full text-xs border border-slate-200 rounded-xl p-2.5 focus:border-indigo-500 h-16"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Canal de Distribuição</label>
                      <input
                        type="text"
                        placeholder="Ex: YouTube, Spotify"
                        value={newChannel}
                        onChange={(e) => setNewChannel(e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded-xl p-2 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Frequência</label>
                      <input
                        type="text"
                        placeholder="Ex: Semanal, Bimestral"
                        value={newFrequency}
                        onChange={(e) => setNewFrequency(e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded-xl p-2 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Responsável Estratégico</label>
                      <select
                        value={newResponsible}
                        onChange={(e) => setNewResponsible(e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50 focus:border-indigo-500"
                      >
                        {teamMembers.map(tm => (
                          <option key={tm} value={tm}>{tm}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">KPI Principal de Sucesso</label>
                      <input
                        type="text"
                        placeholder="Ex: Minutos assistidos, Leads ganhos"
                        value={newKpi}
                        onChange={(e) => setNewKpi(e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded-xl p-2 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3.5 items-end">
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Tipo de Monetização</label>
                      <select
                        value={newRevenueType}
                        onChange={(e) => setNewRevenueType(e.target.value as 'Direta' | 'Indireta' | 'Mista')}
                        className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50 focus:border-indigo-500"
                      >
                        <option value="Direta">Direta</option>
                        <option value="Indireta">Indireta</option>
                        <option value="Mista">Mista</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Receita Direta</label>
                      <input
                        type="text"
                        placeholder="Ex: AdSense, Mensalidade"
                        value={newDirectRev}
                        onChange={(e) => setNewDirectRev(e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded-xl p-2 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Receita Indireta</label>
                      <input
                        type="text"
                        placeholder="Ex: Leads de Shows, Branding"
                        value={newIndirectRev}
                        onChange={(e) => setNewIndirectRev(e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded-xl p-2 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-500 font-semibold mb-1">Fases do Processo (Separados por vírgula)</label>
                    <input
                      type="text"
                      placeholder="Ex: Criação, Gravação, Edição, Publicação"
                      value={newFluxoString}
                      onChange={(e) => setNewFluxoString(e.target.value)}
                      className="w-full text-xs border border-slate-200 rounded-xl p-2.5 focus:border-indigo-500"
                    />
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 rounded-xl transition-all"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl transition-all"
                    >
                      Salvar Produto
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      ) : (
        <div className="space-y-6 animate-fadeIn" id="view-biblioteca-processos">
          {/* Objective Explainer */}
          <div className="bg-indigo-50 text-indigo-900 border border-indigo-150 p-4 rounded-3xl flex gap-3.5 items-start">
            <Workflow className="w-5 h-5 mt-0.5 text-indigo-500 shrink-0" />
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest font-display">Sistematização de Processos (Biblioteca de Fluxos)</h4>
              <p className="text-[11px] text-indigo-700/90 leading-relaxed mt-1">
                Atividades recorrentes necessitam de fluxogramas estáveis para garantir a conformidade artística, acelerar entregas da equipe e evitar dependência integral do Diretor Criativo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {processFlows.map((flow, fidx) => (
              <div key={fidx} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-2xs hover:shadow-xs transition-all space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm font-display flex items-center gap-2">
                    <Shuffle className="w-4 h-4 text-indigo-500" />
                    {flow.name}
                  </h3>
                  <p className="text-[11.5px] text-slate-500 leading-normal mt-1 pt-1 border-b border-slate-50 pb-2">
                    {flow.desc}
                  </p>

                  {/* Flow Steps Vertical/Horizontal Stepper */}
                  <div className="mt-4 space-y-2.5">
                    {flow.steps.map((st, sidx) => (
                      <div key={sidx} className="flex items-center gap-3 pl-2">
                        {/* Dot indicator */}
                        <div className="flex flex-col items-center">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                            sidx === flow.steps.length - 1 
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-bold' 
                              : 'bg-indigo-50/50 border-indigo-100 text-indigo-600 font-medium'
                          }`}>
                            {sidx + 1}
                          </div>
                          {sidx < flow.steps.length - 1 && (
                            <div className="w-[1.5px] h-4 bg-slate-200" />
                          )}
                        </div>
                        {/* Stage Details */}
                        <span className={`text-[11px] p-1.5 border rounded-xl text-left ${
                          sidx === flow.steps.length - 1 ? 'bg-emerald-50/30 border-emerald-100 text-slate-700 font-bold pr-3' : 'bg-slate-50/50 border-slate-100 text-slate-650'
                        }`}>
                          {st}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Padronizado e incorporado nas rotinas semanais para maior autonomia.</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
