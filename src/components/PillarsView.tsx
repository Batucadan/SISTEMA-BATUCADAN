/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Music, 
  GraduationCap, 
  BookOpen, 
  Plus, 
  Search, 
  TrendingUp, 
  Activity, 
  CheckCircle,
  Clock,
  User,
  ExternalLink,
  Edit,
  Trash2,
  X,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { Pillar, Product, PillarId } from '../types';

interface PillarsViewProps {
  pillars: Pillar[];
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  teamMembers: string[];
}

export default function PillarsView({
  pillars,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  teamMembers
}: PillarsViewProps) {
  const [selectedPillarId, setSelectedPillarId] = useState<PillarId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // New Product form fields
  const [isAdding, setIsAdding] = useState(false);
  const [newPillarId, setNewPillarId] = useState<PillarId>('entretenimento');
  const [newName, setNewName] = useState('');
  const [newObjective, setNewObjective] = useState('');
  const [newChannel, setNewChannel] = useState('');
  const [newFrequency, setNewFrequency] = useState('');
  const [newResponsible, setNewResponsible] = useState('Danilo');
  const [newStatus, setNewStatus] = useState<Product['status']>('Ativo');
  const [newRevenueType, setNewRevenueType] = useState<Product['revenueType']>('Direta');
  const [newRevenueSource, setNewRevenueSource] = useState('');

  // Filtering products
  const filteredProducts = products.filter(product => {
    const matchesPillar = selectedPillarId === 'all' || product.pillarId === selectedPillarId;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.objective.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.responsible.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPillar && matchesSearch;
  });

  const getPillarIcon = (pillarId: PillarId) => {
    switch (pillarId) {
      case 'entretenimento':
        return <Music className="w-5 h-5 text-orange-500" />;
      case 'formativo':
        return <GraduationCap className="w-5 h-5 text-amber-500" />;
      case 'pedagogico':
        return <BookOpen className="w-5 h-5 text-indigo-500" />;
    }
  };

  const getPillarBadgeColor = (pillarId: PillarId) => {
    switch (pillarId) {
      case 'entretenimento': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'formativo': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'pedagogico': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    }
  };

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'Ativo':
        return <span className="text-[10px] px-2 py-0.5 font-bold rounded-full bg-orange-105 text-orange-850">Ativo</span>;
      case 'Pausado':
        return <span className="text-[10px] px-2 py-0.5 font-bold rounded-full bg-slate-100 text-slate-800">Pausado</span>;
      case 'Em Planejamento':
        return <span className="text-[10px] px-2 py-0.5 font-bold rounded-full bg-amber-100 text-amber-800">Em Planejamento</span>;
    }
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setIsEditing(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      onUpdateProduct(editingProduct);
      setIsEditing(false);
      setEditingProduct(null);
    }
  };

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    onAddProduct({
      pillarId: newPillarId,
      name: newName,
      objective: newObjective,
      channel: newChannel,
      frequency: newFrequency,
      responsible: newResponsible,
      status: newStatus,
      revenueType: newRevenueType,
      revenueSourceDescription: newRevenueSource
    });
    // Reset
    setNewName('');
    setNewObjective('');
    setNewChannel('');
    setNewFrequency('');
    setNewResponsible('Danilo');
    setNewStatus('Ativo');
    setNewRevenueType('Direta');
    setNewRevenueSource('');
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente remover este produto de seu Pilar Operacional?')) {
      onDeleteProduct(id);
      if (editingProduct?.id === id) {
        setIsEditing(false);
      }
    }
  };

  return (
    <div className="space-y-6" id="pillars-container">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display text-slate-800">
            Pilares Estratégicos & Produtos
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Mapeamento operacional dos três pilares fundamentais da Batucadan Produções LTDA.
          </p>
        </div>

        <button
          onClick={() => {
            setIsAdding(true);
            setIsEditing(false);
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-colors self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Novo Produto
        </button>
      </div>

      {/* Description Cards of the 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="pillars-cards-overview">
        {pillars.map((p) => (
          <div 
            key={p.id}
            onClick={() => setSelectedPillarId(p.id)}
            className={`border rounded-2xl p-5 cursor-pointer transition-all card-shadow ${selectedPillarId === p.id ? 'bg-white border-orange-500 ring-1 ring-orange-500/30 font-bold' : 'bg-white/80 border-slate-200 hover:border-slate-300'}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl">
                {getPillarIcon(p.id)}
              </div>
              <h3 className="font-bold text-slate-800 font-display text-md capitalize">{p.name}</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {p.description}
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-[10px] uppercase font-bold text-slate-400">Produtos mapeados</span>
              <span className="text-xs font-bold font-mono text-slate-700">
                {products.filter(prod => prod.pillarId === p.id).length} unidades
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Pillar Tabs Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg w-full md:w-auto overflow-x-auto">
          <button
            onClick={() => setSelectedPillarId('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${selectedPillarId === 'all' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Todos os Pilares ({products.length})
          </button>
          
          {pillars.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPillarId(p.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap capitalize ${selectedPillarId === p.id ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-500 hover:text-slate-800'}`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por produto ou responsável..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-slate-50/50"
          />
        </div>
      </div>

      {/* Main Grid Content - Columns or Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Products Grid list (Left Area) */}
        <div className="lg:col-span-2 space-y-4" id="products-list-col">
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-500">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-medium">Nenhum produto cadastrado com os critérios informados.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedPillarId('all'); }} 
                className="text-xs text-orange-500 font-semibold mt-1 hover:underline"
              >
                Limpar filtros de busca
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.map((prod) => (
                <div 
                  key={prod.id} 
                  className="bg-white border border-slate-100 hover:border-orange-200 rounded-2xl p-5 card-shadow flex flex-col justify-between group relative transition-all"
                >
                  <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white border border-slate-100 p-1.5 rounded-lg shadow-sm">
                    <button
                      onClick={() => handleOpenEdit(prod)}
                      className="p-1 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-sm"
                      title="Editar Produto"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(prod.id)}
                      className="p-1 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-sm"
                      title="Excluir Produto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[9px] font-bold border rounded-md px-2 py-0.2 capitalize ${getPillarBadgeColor(prod.pillarId)}`}>
                        {prod.pillarId}
                      </span>
                      {getStatusBadge(prod.status)}
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm font-display mb-2">{prod.name}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Objetivo</span>
                        <p className="text-xs text-slate-600 font-sans leading-relaxed">{prod.objective}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 border-t border-slate-50 pt-2">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Canal</span>
                          <span className="text-xs text-slate-700 font-medium">{prod.channel}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Frequência</span>
                          <span className="text-xs text-slate-700 font-medium">{prod.frequency}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-50 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs text-slate-500">Membro Líder: <span className="font-semibold text-slate-700">{prod.responsible}</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Revenue structure */}
                  <div className="mt-4 bg-slate-50/70 border border-slate-100 p-3 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Estilo de Monetização</span>
                      <span className={`text-[9px] px-1.5 py-0.2 font-bold rounded-md ${prod.revenueType === 'Direta' ? 'bg-emerald-50 text-emerald-800' : prod.revenueType === 'Mista' ? 'bg-indigo-50 text-indigo-800' : 'bg-slate-100 text-slate-700'}`}>
                        Receita {prod.revenueType}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 italic">
                      {prod.revenueSourceDescription}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Interactivity Sidebar/Drawer (Right Area) - Add / Edit Product */}
        <div className="lg:col-span-1" id="pillars-form-panel">
          {isEditing && editingProduct ? (
            <div className="bg-white border-2 border-amber-400 rounded-2xl p-5 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="font-bold text-slate-800 text-sm font-display flex items-center gap-1.5">
                  <Edit className="w-4 h-4 text-amber-500" />
                  Editar: {editingProduct.name}
                </h3>
                <button
                  onClick={() => { setIsEditing(false); setEditingProduct(null); }}
                  className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Pilar de Negócio</label>
                  <select
                    value={editingProduct.pillarId}
                    onChange={(e) => setEditingProduct({ ...editingProduct, pillarId: e.target.value as PillarId })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:border-amber-500"
                  >
                    <option value="entretenimento">Entretenimento</option>
                    <option value="formativo">Formativo</option>
                    <option value="pedagogico">Pedagógico</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Nome do Produto</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2.5 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Objetivo Operacional</label>
                  <textarea
                    required
                    rows={3}
                    value={editingProduct.objective}
                    onChange={(e) => setEditingProduct({ ...editingProduct, objective: e.target.value })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2.5 focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Canais</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.channel}
                      onChange={(e) => setEditingProduct({ ...editingProduct, channel: e.target.value })}
                      className="w-full text-xs border border-slate-200 rounded-xl p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Frequência</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.frequency}
                      onChange={(e) => setEditingProduct({ ...editingProduct, frequency: e.target.value })}
                      className="w-full text-xs border border-slate-200 rounded-xl p-2.5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Responsável</label>
                    <select
                      value={editingProduct.responsible}
                      onChange={(e) => setEditingProduct({ ...editingProduct, responsible: e.target.value })}
                      className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                    >
                      {teamMembers.map(tm => (
                        <option key={tm} value={tm}>{tm}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Status</label>
                    <select
                      value={editingProduct.status}
                      onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value as Product['status'] })}
                      className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Pausado">Pausado</option>
                      <option value="Em Planejamento">Em Planejamento</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase">Monetização</label>
                    <select
                      value={editingProduct.revenueType}
                      onChange={(e) => setEditingProduct({ ...editingProduct, revenueType: e.target.value as Product['revenueType'] })}
                      className="text-xs border border-slate-200 rounded-lg p-1 bg-slate-50"
                    >
                      <option value="Direta">Receita Direta</option>
                      <option value="Indireta">Receita Indireta</option>
                      <option value="Mista">Receita Mista</option>
                    </select>
                  </div>

                  <label className="block text-[10px] font-medium text-slate-400 mb-1">Como gera receita para a empresa?</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.revenueSourceDescription}
                    onChange={(e) => setEditingProduct({ ...editingProduct, revenueSourceDescription: e.target.value })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2.5"
                    placeholder="Ex: Faturamento e cachê do edital municipal ou vendas recorrentes Hotmart."
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-2 rounded-xl transition-colors"
                  >
                    Salvar Edição
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsEditing(false); setEditingProduct(null); }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs px-4 py-2 rounded-xl transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          ) : isAdding ? (
            <div className="bg-white border border-emerald-300 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="font-bold text-emerald-800 text-sm font-display flex items-center gap-1.5">
                  <PlusCircle className="w-4 h-4 text-emerald-600" />
                  Novo Produto Mapeado
                </h3>
                <button
                  onClick={() => setIsAdding(false)}
                  className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveNew} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Pilar Oficial</label>
                  <select
                    value={newPillarId}
                    onChange={(e) => setNewPillarId(e.target.value as PillarId)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:border-emerald-500"
                  >
                    <option value="entretenimento">Entretenimento</option>
                    <option value="formativo">Formativo</option>
                    <option value="pedagogico">Pedagógico</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Nome do Produto</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Livros de Ilustração Musical"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2.5 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Objetivo Operacional</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Objetivo estratégico do produto..."
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2.5 focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Canais</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Hotmart, Amazon"
                      value={newChannel}
                      onChange={(e) => setNewChannel(e.target.value)}
                      className="w-full text-xs border border-slate-200 rounded-xl p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Frequência</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Semanal, Mensal"
                      value={newFrequency}
                      onChange={(e) => setNewFrequency(e.target.value)}
                      className="w-full text-xs border border-slate-200 rounded-xl p-2.5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Líder</label>
                    <select
                      value={newResponsible}
                      onChange={(e) => setNewResponsible(e.target.value)}
                      className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                    >
                      {teamMembers.map(tm => (
                        <option key={tm} value={tm}>{tm}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Status</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as Product['status'])}
                      className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Pausado">Pausado</option>
                      <option value="Em Planejamento">Em Planejamento</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase">Monetização</label>
                    <select
                      value={newRevenueType}
                      onChange={(e) => setNewRevenueType(e.target.value as Product['revenueType'])}
                      className="text-xs border border-slate-200 rounded-lg p-1 bg-slate-50"
                    >
                      <option value="Direta">Receita Direta</option>
                      <option value="Indireta">Receita Indireta</option>
                      <option value="Mista">Receita Mista</option>
                    </select>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Descrição da arrecadação de valores..."
                    value={newRevenueSource}
                    onChange={(e) => setNewRevenueSource(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2.5"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors"
                >
                  Criar Produto do Pilar
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
              <h3 className="font-bold text-slate-800 text-sm font-display mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Estrutura de Resultados
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                O Batucadan OS opera separando os ativos da IP e canais digitais nos pilares correspondentes. Clique em qualquer pilar acima para filtrar os produtos cadastrados de cada departamento.
              </p>
              
              <div className="space-y-3.5 border-t border-slate-100 pt-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Produtos em Produção</span>
                  <span className="font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-xs">
                    {products.filter(p => p.status === 'Ativo').length} Ativos
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Ideias & Planejados</span>
                  <span className="font-mono font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-xs">
                    {products.filter(p => p.status === 'Em Planejamento').length} Planejados
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium font-sans">Receita Direta Comercial</span>
                  <span className="font-mono font-bold text-slate-700">
                    {products.filter(p => p.revenueType === 'Direta').length} produtos
                  </span>
                </div>
              </div>

              <div className="mt-5 bg-emerald-500 text-white p-4 rounded-xl flex gap-3 items-start">
                <div className="p-1.5 bg-emerald-400 rounded-lg mt-0.5">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-display">Integração Ágil</h4>
                  <p className="text-[11px] text-emerald-100 mt-1 leading-relaxed">
                    Novos produtos criados aqui ficam disponíveis automaticamente como categorias vinculáveis para peças de Conteúdo e Campanhas no Comercial.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
