import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Copyright, 
  Music, 
  BookOpen, 
  Tv, 
  Sparkles, 
  Award, 
  HelpCircle, 
  DollarSign, 
  Plus, 
  Trash2, 
  Layers,
  Heart,
  Calendar
} from 'lucide-react';
import { IpAsset } from '../types';

interface IpCenterViewProps {
  assets: IpAsset[];
  onAddAsset?: (asset: Omit<IpAsset, 'id'>) => void;
  onDeleteAsset?: (id: string) => void;
  teamMembers: string[];
}

export default function IpCenterView({ assets, onAddAsset, onDeleteAsset, teamMembers }: IpCenterViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<'Marca' | 'Personagem' | 'Música' | 'Livro' | 'Metodologia' | 'Série Animada'>('Personagem');
  const [newQuantity, setNewQuantity] = useState<string>('1');
  const [newStatus, setNewStatus] = useState<string>('Ativo e Registrado');
  const [newResponsible, setNewResponsible] = useState(teamMembers[0] || 'Danilo');
  const [newMonetization, setNewMonetization] = useState<'Altíssimo' | 'Alto' | 'Médio' | 'Baixo'>('Altíssimo');
  const [newDescription, setNewDescription] = useState('');
  const [newEstimatedValue, setNewEstimatedValue] = useState('');

  // Totalized value sum parsing
  const parsedTotalValue = assets.reduce((acc, curr) => {
    if (!curr.estimatedValue || curr.estimatedValue.toLowerCase().includes('avaliação')) return acc;
    // Extract numbers from something like "R$ 450.000"
    const numbersOnly = parseInt(curr.estimatedValue.replace(/[^0-9]/g, ''), 10);
    return isNaN(numbersOnly) ? acc : acc + numbersOnly;
  }, 0);

  const filteredAssets = assets.filter(item => {
    return selectedCategory === 'all' || item.category === selectedCategory;
  });

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newDescription) {
      alert('Por favor, preencha o Nome e a Descrição do ativo de propriedade intelectual.');
      return;
    }

    if (onAddAsset) {
      onAddAsset({
        name: newName,
        category: newCategory,
        quantity: isNaN(Number(newQuantity)) ? newQuantity : Number(newQuantity),
        status: newStatus,
        responsible: newResponsible,
        monetizationPotential: newMonetization,
        description: newDescription,
        estimatedValue: newEstimatedValue || 'Em avaliação'
      });
      alert('Ativo de IP registrado com sucesso no banco de dados!');
      setIsAdding(false);
      setNewName('');
      setNewDescription('');
      setNewEstimatedValue('');
      setNewQuantity('1');
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Marca':
        return <Award className="w-4 h-4 text-orange-500" />;
      case 'Personagem':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'Música':
        return <Music className="w-4 h-4 text-indigo-500" />;
      case 'Livro':
        return <BookOpen className="w-4 h-4 text-emerald-500" />;
      case 'Série Animada':
        return <Tv className="w-4 h-4 text-violet-500" />;
      default:
        return <Copyright className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6" id="view-ip-center">
      {/* Header section with cumulative asset size */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            Patrimônio Imaterial
          </span>
          <h1 className="text-3xl font-bold font-display tracking-tight text-slate-800 mt-1">
            Centro de IP (Propriedade Intelectual)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Registro, proteção de marcas, personagens e a soma do valuation intangível acumulado pelo Batucadan.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2 shadow-xs transition-colors self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Registrar Ativo IP
        </button>
      </div>

      {/* Cumulative Metrics Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric valuation */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-orange-400 font-display">Patrimônio Declarado</span>
            <h4 className="text-sm font-bold text-slate-100 mt-1">Estimativa de Valuation Intangível</h4>
            <div className="my-3 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold font-mono text-emerald-400">
                R$ {(parsedTotalValue / 1000).toLocaleString('pt-BR')}.000
              </span>
              <span className="text-[10px] text-slate-400">YTD</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            Soma calculada dos registros vigentes da marca, personagens vetoriais, partituras e canções arquivadas.
          </p>
        </div>

        {/* Certificate security box */}
        <div className="bg-indigo-50/55 border border-indigo-100 rounded-3xl p-5 shadow-2xs flex gap-4 items-start md:col-span-2">
          <div className="p-3 bg-white border border-indigo-100 rounded-2xl text-indigo-650 shrink-0 shadow-3xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-indigo-850 font-display">
              Segurança Jurídica dos Ativos (INPI)
            </h4>
            <p className="text-[11.5px] text-indigo-750 leading-relaxed">
              Todos os nossos 5 bonecos conceituais principais estão sob registro expedido na Biblioteca Nacional. Recomenda-se registrar a classe 28 (Brinquedos) e os ritmos em fita física anualmente antes de abrir para franquias municipais.
            </p>
          </div>
        </div>

      </div>

      {/* Filter and Content Grid */}
      <div className="space-y-4">
        {/* Category filters */}
        <div className="flex bg-slate-100 border border-slate-200 p-1 rounded-xl w-fit max-w-full overflow-x-auto gap-0.5 shadow-3xs scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === 'all' ? 'bg-white text-slate-800 shadow-3xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Todos do Acervo ({assets.length})
          </button>
          {['Marca', 'Personagem', 'Música', 'Livro', 'Metodologia', 'Série Animada'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat ? 'bg-white text-slate-800 shadow-3xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* IP Assets cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map(item => (
            <div 
              key={item.id} 
              className="bg-white border border-slate-150 rounded-3xl p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                {/* Visual Category badge and valuation */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-55">
                  <div className="flex items-center gap-1.5">
                    <span className="p-1 px-1.5 bg-slate-50 border border-slate-200/50 rounded-lg">
                      {getCategoryIcon(item.category)}
                    </span>
                    <span className="text-[10px] font-extrabold text-slate-600 font-display uppercase tracking-wide">
                      {item.category}
                    </span>
                  </div>
                  
                  {item.estimatedValue && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold border border-emerald-100 font-mono px-2 py-0.5 rounded-md">
                      Val: {item.estimatedValue}
                    </span>
                  )}
                </div>

                {/* Name */}
                <h3 className="text-md font-bold font-display text-slate-800 mt-3.5 tracking-tight uppercase">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-[11.5px] text-slate-500 mt-2.5 leading-relaxed">
                  {item.description}
                </p>

                {/* Technical data points */}
                <div className="grid grid-cols-2 gap-2 mt-4.5 pt-3.5 border-t border-slate-100 text-[10px] text-slate-500 select-none">
                  <div>
                    <span className="block text-slate-400 font-semibold mb-0.5">Quantidade / Registro</span>
                    <span className="font-bold text-slate-800">{item.quantity ?? 'Único'}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-semibold mb-0.5">Status INPI</span>
                    <span className="font-bold text-indigo-700">{item.status || 'Registrado'}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-semibold mb-0.5">Potencial Monetização</span>
                    <span className={`font-bold ${
                      item.monetizationPotential === 'Altíssimo' ? 'text-orange-600' : 'text-emerald-600'
                    }`}>{item.monetizationPotential}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-semibold mb-0.5">Guardião</span>
                    <span className="font-bold text-slate-800">{item.responsible}</span>
                  </div>
                </div>
              </div>

              {onDeleteAsset && (
                <div className="pt-4 border-t border-slate-100 mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      if (confirm(`Deseja mesmo dar baixa/excluir o ativo de propriedade imaterial "${item.name}"?`)) {
                        onDeleteAsset(item.id);
                      }
                    }}
                    className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    title="Remover Registro de IP"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Empty state category */}
          {filteredAssets.length === 0 && (
            <div className="bg-white border border-slate-200 text-center py-10 rounded-3xl p-5 md:col-span-3">
              <Copyright className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-600">Nenhum ativo de IP registrado nessa modalidade</p>
              <p className="text-[10px] text-slate-400 mt-1">Crie um registro pressionando "Registrar Ativo IP".</p>
            </div>
          )}
        </div>
      </div>

      {/* Popup modal for Add Asset */}
      {isAdding && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 space-y-4 shadow-sm select-none">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-850 text-sm uppercase tracking-wide font-display flex items-center gap-1">
                <Copyright className="w-4 h-4 text-emerald-600" />
                Registrar Ativo de IP
              </h3>
              <button 
                onClick={() => setIsAdding(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold px-1"
              >
                X
              </button>
            </div>

            <form onSubmit={handleCreateAsset} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Nome do Ativo Intangível *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Personagem Juju"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2.5 focus:border-indigo-500 text-slate-700 font-display font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Categoria de IP</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:border-indigo-500 text-slate-650"
                  >
                    <option value="Marca">Marca</option>
                    <option value="Personagem">Personagem</option>
                    <option value="Música">Música</option>
                    <option value="Livro">Livro</option>
                    <option value="Metodologia">Metodologia</option>
                    <option value="Série Animada">Série Animada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Status de Direitos</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Registrado ou Em Criação"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2.5 focus:border-indigo-500 text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Quantidade / Unidade</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 5 vetores, 1 marca"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 focus:border-indigo-500 text-slate-750"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Est. Valuation (R$)</label>
                  <input
                    type="text"
                    placeholder="Ex: R$ 450.000"
                    value={newEstimatedValue}
                    onChange={(e) => setNewEstimatedValue(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 focus:border-indigo-500 text-slate-750 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Guardião / Responsável</label>
                  <select
                    value={newResponsible}
                    onChange={(e) => setNewResponsible(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50 focus:border-indigo-500 text-slate-650"
                  >
                    {teamMembers.map(tm => (
                      <option key={tm} value={tm}>{tm}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Potencial Monetização</label>
                  <select
                    value={newMonetization}
                    onChange={(e) => setNewMonetization(e.target.value as any)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50 focus:border-indigo-500 text-slate-650 font-semibold"
                  >
                    <option value="Altíssimo">Altíssimo</option>
                    <option value="Alto">Alto</option>
                    <option value="Médio">Médio</option>
                    <option value="Baixo">Baixo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Descrição Detalhada do Ativo IP *</label>
                <textarea
                  required
                  placeholder="Descreva a singularidade, escopo de proteção e relevância desse patrimônio..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2.5 focus:border-indigo-500 h-16 text-slate-650"
                />
              </div>

              <div className="flex gap-2.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2 rounded-xl transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-xl transition-all"
                >
                  Registrar IP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
