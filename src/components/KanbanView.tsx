/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  User, 
  Calendar, 
  Link2, 
  MoreVertical, 
  ArrowLeft, 
  ArrowRight, 
  Trash2, 
  Edit, 
  X, 
  Info,
  CheckCircle,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { ContentCard, ContentStage, Product } from '../types';

interface KanbanViewProps {
  contentCards: ContentCard[];
  products: Product[];
  onAddCard: (card: Omit<ContentCard, 'id'>) => void;
  onUpdateCard: (card: ContentCard) => void;
  onDeleteCard: (cardId: string) => void;
  teamMembers: string[];
}

const STAGES: ContentStage[] = [
  'Ideia',
  'Roteiro',
  'Em produção',
  'Em edição',
  'Em revisão Danilo',
  'Pronto',
  'Agendado',
  'Publicado'
];

export default function KanbanView({
  contentCards,
  products,
  onAddCard,
  onUpdateCard,
  onDeleteCard,
  teamMembers
}: KanbanViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResponsible, setSelectedResponsible] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<string>('all');

  // Modal / Form States
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCard, setEditingCard] = useState<ContentCard | null>(null);

  // Form Fields
  const [newTitle, setNewTitle] = useState('');
  const [newProductId, setNewProductId] = useState('');
  const [newResponsible, setNewResponsible] = useState('Danilo');
  const [newDeadline, setNewDeadline] = useState('2026-06-25');
  const [newChannel, setNewChannel] = useState('YouTube');
  const [newFileLink, setNewFileLink] = useState('');
  const [newStage, setNewStage] = useState<ContentStage>('Ideia');
  const [newNotes, setNewNotes] = useState('');
  const [newPriority, setNewPriority] = useState<ContentCard['priority']>('Média');

  const getProductOptions = () => {
    return products.map(p => ({ id: p.id, name: p.name }));
  };

  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newProductId) return;

    const matchedProduct = products.find(p => p.id === newProductId);
    const prodName = matchedProduct ? matchedProduct.name : 'Outro';

    onAddCard({
      productId: newProductId,
      productName: prodName,
      title: newTitle,
      responsible: newResponsible,
      deadline: newDeadline,
      channel: newChannel,
      fileLink: newFileLink,
      stage: newStage,
      notes: newNotes,
      priority: newPriority
    });

    // Reset Form Fields
    setNewTitle('');
    setNewProductId('');
    setNewResponsible('Danilo');
    setNewDeadline('2026-06-25');
    setNewChannel('YouTube');
    setNewFileLink('');
    setNewStage('Ideia');
    setNewNotes('');
    setNewPriority('Média');
    setIsAdding(false);
  };

  const handleOpenEdit = (card: ContentCard) => {
    setEditingCard(card);
    setIsEditing(true);
  };

  const handleUpdateCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCard) {
      const matchedProduct = products.find(p => p.id === editingCard.productId);
      if (matchedProduct) {
        editingCard.productName = matchedProduct.name;
      }
      onUpdateCard(editingCard);
      setIsEditing(false);
      setEditingCard(null);
    }
  };

  const moveCard = (card: ContentCard, direction: 'prev' | 'next') => {
    const currentIndex = STAGES.indexOf(card.stage);
    let newIndex = currentIndex;
    if (direction === 'prev' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction === 'next' && currentIndex < STAGES.length - 1) {
      newIndex = currentIndex + 1;
    }

    if (newIndex !== currentIndex) {
      onUpdateCard({
        ...card,
        stage: STAGES[newIndex]
      });
    }
  };

  const moveCardToDirectStage = (card: ContentCard, targetStage: ContentStage) => {
    onUpdateCard({
      ...card,
      stage: targetStage
    });
  };

  const handleDeleteCard = (id: string) => {
    if (confirm('Deseja realmente arquivar/deletar esta peça de conteúdo de sua esteira?')) {
      onDeleteCard(id);
      setIsEditing(false);
      setEditingCard(null);
    }
  };

  // Filter cards
  const filteredCards = contentCards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          card.notes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesResp = selectedResponsible === 'all' || card.responsible === selectedResponsible;
    const matchesProd = selectedProduct === 'all' || card.productId === selectedProduct;
    return matchesSearch && matchesResp && matchesProd;
  });

  const getPriorityBadgeColor = (prio: ContentCard['priority']) => {
    switch (prio) {
      case 'Alta': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Média': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Baixa': return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStageHeaderColor = (stage: ContentStage) => {
    switch (stage) {
      case 'Ideia': return 'border-t-4 border-t-slate-400 bg-slate-50';
      case 'Roteiro': return 'border-t-4 border-t-cyan-400 bg-cyan-50/20';
      case 'Em produção': return 'border-t-4 border-t-amber-400 bg-amber-50/20';
      case 'Em edição': return 'border-t-4 border-t-indigo-400 bg-indigo-50/20';
      case 'Em revisão Danilo': return 'border-t-4 border-t-teal-500 bg-teal-50/30';
      case 'Pronto': return 'border-t-4 border-t-purple-500 bg-purple-50/20';
      case 'Agendado': return 'border-t-4 border-t-emerald-400 bg-emerald-50/20';
      case 'Publicado': return 'border-t-4 border-t-emerald-600 bg-green-50/35';
    }
  };

  return (
    <div className="space-y-6" id="kanban-view-container">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display text-slate-800">
            Produção de Conteúdo
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Gestão visual da esteira operacional de vídeos, músicas, livros e postagens da Batucadan.
          </p>
        </div>

        <button
          onClick={() => {
            if (products.length === 0) {
              alert('Antes de cadastrar uma produção, adicione pelo menos um produto na aba Pilares e Produtos.');
              return;
            }
            setNewProductId(products[0]?.id || '');
            setIsAdding(true);
            setIsEditing(false);
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-colors self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Adicionar Cartão (Nova Peça)
        </button>
      </div>

      {/* Control & Filter Panel */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
        {/* Full Query */}
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar título do conteúdo ou anotações..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-slate-50/50 text-slate-700"
          />
        </div>

        {/* Responsible Filter */}
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-2.5">
          <User className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
          <select
            value={selectedResponsible}
            onChange={(e) => setSelectedResponsible(e.target.value)}
            className="w-full text-xs py-2 bg-transparent border-0 focus:ring-0 text-slate-600 font-semibold"
          >
            <option value="all">Membro: Todos</option>
            {teamMembers.map(tm => (
              <option key={tm} value={tm}>{tm}</option>
            ))}
          </select>
        </div>

        {/* Product Filter */}
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-2.5">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full text-xs py-2 bg-transparent border-0 focus:ring-0 text-slate-600 font-semibold"
          >
            <option value="all">Produto: Todos</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Kanban Board Container (Flexible multi-column wrapper with smooth horizontal scrolling) */}
      <div className="flex overflow-x-auto gap-4 pb-6 scrollbar-thin" id="kanban-wrapper">
        {STAGES.map((stage) => {
          const stageCards = filteredCards.filter((card) => card.stage === stage);
          return (
            <div 
              key={stage} 
              className={`min-w-[270px] max-w-[300px] flex-1 rounded-2xl border border-slate-200 shadow-2xs flex flex-col max-h-[640px] bg-slate-100/30 ${getStageHeaderColor(stage)}`}
            >
              {/* Column Header */}
              <div className="p-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-800 text-xs font-display truncate pr-2">{stage}</h3>
                  <span className="text-[10px] text-slate-500 block font-mono mt-0.5">
                    {stageCards.length} {stageCards.length === 1 ? 'item' : 'itens'}
                  </span>
                </div>
              </div>

              {/* Column Cards Flow */}
              <div className="p-3.5 space-y-3 overflow-y-auto flex-1 min-h-[350px]">
                {stageCards.length === 0 ? (
                  <div className="border border-dashed border-slate-200 rounded-xl py-8 text-center text-[11px] text-slate-400">
                    Arraste ou clique para mover cartões aqui.
                  </div>
                ) : (
                  stageCards.map((card) => (
                    <div 
                      key={card.id} 
                      className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 shadow-3xs hover:shadow-2xs transition-all relative group flex flex-col justify-between"
                    >
                      {/* Top bar */}
                      <div className="flex items-center justify-between gap-1.5 mb-2.5">
                        <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-sm truncate max-w-[130px]">
                          {card.productName}
                        </span>
                        <span className={`text-[8px] font-bold border rounded-md px-1.5 py-0.2 ${getPriorityBadgeColor(card.priority)}`}>
                          {card.priority}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug mb-2">
                        {card.title}
                      </h4>

                      {/* Small details */}
                      <div className="space-y-1 text-[11px] text-slate-600 border-t border-slate-50 pt-2.5 mb-2">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3 h-3 text-slate-400" />
                          <span className="truncate">Resp: <span className="font-semibold text-slate-700">{card.responsible}</span></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span className={`${card.deadline < '2026-06-21' ? 'text-red-600 font-bold' : 'text-slate-500'} font-mono`}>
                            {card.deadline.split('-').reverse().join('/')}
                          </span>
                        </div>
                        {card.channel && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-slate-400 block uppercase">Canal</span>
                            <span className="font-semibold text-slate-700">{card.channel}</span>
                          </div>
                        )}
                      </div>

                      {/* Observations note */}
                      {card.notes && (
                        <p className="text-[10px] text-slate-500 font-sans leading-relaxed line-clamp-2 bg-slate-50 rounded-lg p-2 mb-2 italic">
                          "{card.notes}"
                        </p>
                      )}

                      {/* Bottom actions bar */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 mt-1.5">
                        {/* File link */}
                        {card.fileLink ? (
                          <a 
                            href={card.fileLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1 shrink-0"
                          >
                            <Link2 className="w-3 h-3" /> Link/Arquivo
                          </a>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">Sem anexo</span>
                        )}

                        {/* Interactive edit and column shift handles */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEdit(card)}
                            className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-700"
                            title="Editar Cartão"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          
                          {/* Left action */}
                          <button
                            onClick={() => moveCard(card, 'prev')}
                            disabled={STAGES.indexOf(card.stage) === 0}
                            className="p-1 disabled:opacity-30 hover:bg-slate-100 rounded text-slate-500"
                            title="Deslocar coluna anterior"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>

                          {/* Right action */}
                          <button
                            onClick={() => moveCard(card, 'next')}
                            disabled={STAGES.indexOf(card.stage) === STAGES.length - 1}
                            className="p-1 disabled:opacity-30 hover:bg-slate-100 rounded text-slate-500"
                            title="Deslocar próxima coluna"
                          >
                            <ArrowRight className="w-3 h-3" />
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

      {/* MODAL 1: ADD NEW CARD */}
      {isAdding && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-150 pb-3">
              <h3 className="font-bold text-slate-800 text-lg font-display">Adicionar Peça na Esteira</h3>
              <button
                onClick={() => setIsAdding(false)}
                className="p-1 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCard} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Título do Conteúdo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Videoclipe O Samba do Jabuti"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Produto Vinculado</label>
                  <select
                    value={newProductId}
                    onChange={(e) => setNewProductId(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Responsável</label>
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
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Prazo de Entrega</label>
                  <input
                    type="date"
                    required
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Canal de Distribuição</label>
                  <input
                    type="text"
                    placeholder="Ex: YouTube, Instagram"
                    value={newChannel}
                    onChange={(e) => setNewChannel(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Estágio Inicial</label>
                <select
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value as ContentStage)}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                >
                  {STAGES.map(stg => (
                    <option key={stg} value={stg}>{stg}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Prioridade</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as ContentCard['priority'])}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                  >
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Link de arquivo / Workspace</label>
                  <input
                    type="text"
                    placeholder="Ex: drive.google.com/..."
                    value={newFileLink}
                    onChange={(e) => setNewFileLink(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Observações ou Briefing</label>
                <textarea
                  rows={2}
                  placeholder="Instruções para o editor ou detalhes adicionais..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2"
                />
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-2.5 rounded-xl transition-colors"
                >
                  Salvar Peça no Kanban
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-650 font-bold text-xs px-4 py-2.5 rounded-xl"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT CARD */}
      {isEditing && editingCard && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-150 pb-3">
              <h3 className="font-bold text-slate-800 text-md font-display flex items-center gap-1">
                <Edit className="w-4 h-4 text-orange-500" /> Editar Peça
              </h3>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleDeleteCard(editingCard.id)}
                  className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                  title="Arquivar / Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setIsEditing(false); setEditingCard(null); }}
                  className="p-1 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdateCardSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Título do Conteúdo</label>
                <input
                  type="text"
                  required
                  value={editingCard.title}
                  onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Produto Associado</label>
                  <select
                    value={editingCard.productId}
                    onChange={(e) => setEditingCard({ ...editingCard, productId: e.target.value })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Responsável</label>
                  <select
                    value={editingCard.responsible}
                    onChange={(e) => setEditingCard({ ...editingCard, responsible: e.target.value })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                  >
                    {teamMembers.map(tm => (
                      <option key={tm} value={tm}>{tm}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Prazo de Entrega</label>
                  <input
                    type="date"
                    required
                    value={editingCard.deadline}
                    onChange={(e) => setEditingCard({ ...editingCard, deadline: e.target.value })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Canal de Distribuição</label>
                  <input
                    type="text"
                    required
                    value={editingCard.channel}
                    onChange={(e) => setEditingCard({ ...editingCard, channel: e.target.value })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Coluna (Estágio no Kanban)</label>
                <select
                  value={editingCard.stage}
                  onChange={(e) => setEditingCard({ ...editingCard, stage: e.target.value as ContentStage })}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                >
                  {STAGES.map(stg => (
                    <option key={stg} value={stg}>{stg}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Prioridade</label>
                  <select
                    value={editingCard.priority}
                    onChange={(e) => setEditingCard({ ...editingCard, priority: e.target.value as ContentCard['priority'] })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                  >
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Link de arquivo / Drive</label>
                  <input
                    type="text"
                    value={editingCard.fileLink}
                    onChange={(e) => setEditingCard({ ...editingCard, fileLink: e.target.value })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2"
                    placeholder="URL completa..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Observações ou Briefing</label>
                <textarea
                  rows={2}
                  value={editingCard.notes}
                  onChange={(e) => setEditingCard({ ...editingCard, notes: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2"
                />
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-2.5 rounded-xl transition-colors"
                >
                  Salvar Alterações
                </button>
                <button
                  type="button"
                  onClick={() => { setIsEditing(false); setEditingCard(null); }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-650 font-bold text-xs px-4 py-2.5 rounded-xl"
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
