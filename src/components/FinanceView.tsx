/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  TrendingUp, 
  FolderOpen, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  FileText, 
  Clock, 
  Check, 
  X, 
  Trash2, 
  Edit, 
  Filter, 
  FileCheck,
  AlertCircle,
  HelpCircle,
  Activity,
  Calendar
} from 'lucide-react';
import { FinancialEntry, FinancialType, FinancialCategory } from '../types';

interface FinanceViewProps {
  financials: FinancialEntry[];
  onAddEntry: (entry: Omit<FinancialEntry, 'id'>) => void;
  onUpdateEntry: (entry: FinancialEntry) => void;
  onDeleteEntry: (entryId: string) => void;
  teamMembers: string[];
}

const CATEGORIES: FinancialCategory[] = [
  'Show', 
  'Oficina', 
  'Curso', 
  'Livros-Materiais', 
  'AdSense-YouTube', 
  'Royalty-Música', 
  'Impostos', 
  'Produção-Edição', 
  'Marketing', 
  'Funcionários-Equipe', 
  'Administrativo'
];

export default function FinanceView({
  financials,
  onAddEntry,
  onUpdateEntry,
  onDeleteEntry,
  teamMembers
}: FinanceViewProps) {
  const currentMonthPrefix = '2026-06'; // Focus June 2026 matches client instructions

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');

  // Form Modals State
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEntry, setEditingEntry] = useState<FinancialEntry | null>(null);

  // New Transaction Form state
  const [title, setTitle] = useState('');
  const [type, setType] = useState<FinancialType>('receita');
  const [category, setCategory] = useState<FinancialCategory>('Show');
  const [value, setValue] = useState<number>(3000);
  const [date, setDate] = useState('2026-06-15');
  const [invoiceStatus, setInvoiceStatus] = useState<FinancialEntry['invoiceStatus']>('Emitida');
  const [paymentStatus, setPaymentStatus] = useState<FinancialEntry['paymentStatus']>('Pago');
  const [responsible, setResponsible] = useState('Sora');
  const [notes, setNotes] = useState('');

  // 1. Calculations & Metrics (Filters automatically focus on June 2026, but lists let them view all)
  const juneEntries = financials.filter(f => f.date.startsWith(currentMonthPrefix));

  const revenuesJune = juneEntries.filter(f => f.type === 'receita');
  const totalRevenues = revenuesJune.reduce((acc, f) => acc + f.value, 0);

  const expensesJune = juneEntries.filter(f => f.type === 'despesa');
  const totalExpenses = expensesJune.reduce((acc, f) => acc + f.value, 0);

  const estimatedProfit = totalRevenues - totalExpenses;

  // Pending receivables (Recebimentos Pendentes de Junho)
  const pendingReceivables = revenuesJune
    .filter(f => f.paymentStatus === 'Pendente' || f.paymentStatus === 'Atrasado')
    .reduce((acc, f) => acc + f.value, 0);

  // Pending payables (Pagamentos Pendentes/Contas a pagar de Junho)
  const pendingPayables = expensesJune
    .filter(f => f.paymentStatus === 'Pendente' || f.paymentStatus === 'Atrasado')
    .reduce((acc, f) => acc + f.value, 0);

  // Production costs (Custos de Produção/Edição de Junho)
  const productionCosts = expensesJune
    .filter(f => f.category === 'Produção-Edição')
    .reduce((acc, f) => acc + f.value, 0);

  // Invoice statuses
  const pendingInvoicesCount = juneEntries.filter(f => f.invoiceStatus === 'Pendente').length;

  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onAddEntry({
      title,
      type,
      category,
      value: Number(value),
      date,
      invoiceStatus,
      paymentStatus,
      responsible,
      notes
    });

    // Reset Form Fields
    setTitle('');
    setType('receita');
    setCategory('Show');
    setValue(3000);
    setDate('2026-06-15');
    setInvoiceStatus('Emitida');
    setPaymentStatus('Pago');
    setResponsible('Sora');
    setNotes('');
    setIsAdding(false);
  };

  const handleOpenEdit = (entry: FinancialEntry) => {
    setEditingEntry(entry);
    setIsEditing(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEntry) {
      onUpdateEntry({
        ...editingEntry,
        value: Number(editingEntry.value)
      });
      setIsEditing(false);
      setEditingEntry(null);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente excluir esta transação do financeiro?')) {
      onDeleteEntry(id);
      setIsEditing(false);
      setEditingEntry(null);
    }
  };

  // Quick Action: pay/receive deal
  const togglePaymentStatus = (entry: FinancialEntry) => {
    const nextStatus = entry.paymentStatus === 'Pago' ? 'Pendente' : 'Pago';
    onUpdateEntry({
      ...entry,
      paymentStatus: nextStatus
    });
  };

  // Quick Action: toggle NF
  const toggleNFStatus = (entry: FinancialEntry) => {
    let nextNF: FinancialEntry['invoiceStatus'] = 'Emitida';
    if (entry.invoiceStatus === 'Emitida') {
      nextNF = 'Pendente';
    } else if (entry.invoiceStatus === 'Pendente') {
      nextNF = 'Não Aplicável';
    } else {
      nextNF = 'Emitida';
    }
    onUpdateEntry({
      ...entry,
      invoiceStatus: nextNF
    });
  };

  // Filter transaction log
  const filteredEntries = financials.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (entry.notes && entry.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === 'all' || entry.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || entry.category === categoryFilter;
    const matchesPayment = paymentFilter === 'all' || entry.paymentStatus === paymentFilter;
    return matchesSearch && matchesType && matchesCategory && matchesPayment;
  }).sort((a, b) => b.date.localeCompare(a.date));

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(val);
  };

  return (
    <div className="space-y-6" id="finance-container">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display text-slate-800">
            Controle Financeiro
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Gestão de fluxo de caixa, pagamentos recorrentes de equipe, emissão fiscal de notas fiscais e custos de estúdio.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-colors self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Lançar Transação
        </button>
      </div>

      {/* KPI Financial Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="finance-kpi-panel">
        
        {/* Receita & recebimentos pendentes */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 card-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Entrada de Recursos (Junho)</span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
              <ArrowUpRight className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-800 font-mono">
              {formatBRL(totalRevenues)}
            </h3>
            <div className="mt-2 space-y-1">
              <p className="text-[11px] text-slate-500 flex justify-between">
                <span>Recebidos líquidos:</span> 
                <span className="font-semibold text-orange-600 font-mono">{formatBRL(totalRevenues - pendingReceivables)}</span>
              </p>
              <p className="text-[11px] text-slate-500 flex justify-between">
                <span>Recebimentos pendentes:</span> 
                <span className="font-semibold text-amber-600 font-mono">{formatBRL(pendingReceivables)}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Despesas & contas a pagar */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 card-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Saídas de Caixa / Custos (Junho)</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-505 flex items-center justify-center">
              <ArrowDownRight className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-800 font-mono">
              {formatBRL(totalExpenses)}
            </h3>
            <div className="mt-2 space-y-1">
              <p className="text-[11px] text-slate-500 flex justify-between">
                <span>Contas já pagas:</span> 
                <span className="font-semibold text-rose-500 font-mono">{formatBRL(totalExpenses - pendingPayables)}</span>
              </p>
              <p className="text-[11px] text-slate-500 flex justify-between">
                <span>Contas a pagar / pendente:</span> 
                <span className="font-semibold text-amber-600 font-mono">{formatBRL(pendingPayables)}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Lucros & custos de produçao */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 card-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Resultado & Produção</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center">
              <TrendingUp className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className={`text-2xl font-bold font-mono ${estimatedProfit >= 0 ? 'text-indigo-600' : 'text-rose-500'}`}>
              {formatBRL(estimatedProfit)}
            </h3>
            <div className="mt-2 space-y-1">
              <p className="text-[11px] text-slate-500 flex justify-between">
                <span>Custos gravação / edição:</span> 
                <span className="font-semibold text-slate-700 font-mono">{formatBRL(productionCosts)}</span>
              </p>
              <p className="text-[11px] text-slate-500 flex justify-between">
                <span>Notas fiscais pendentes:</span> 
                <span className="font-semibold text-amber-600 font-mono">{pendingInvoicesCount} pendências</span>
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Filter and Ledger section */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 card-shadow space-y-5" id="finance-ledger">
        
        {/* List Filters header */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <h3 className="font-bold text-slate-800 text-sm font-display self-start lg:self-center">
            Livro Caixa & Transações ({filteredEntries.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex items-center gap-2.5 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Pesquisar transação..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 w-full lg:w-44 text-[11px] border border-slate-200 rounded-xl"
              />
            </div>

            {/* Type selector */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-[11px] font-semibold border border-slate-200 rounded-xl px-2 py-1.5 bg-slate-50 text-slate-600"
            >
              <option value="all">Tipos: Todos</option>
              <option value="receita">Receita (+)</option>
              <option value="despesa">Despesa (-)</option>
            </select>

            {/* Category selector */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-[11px] font-semibold border border-slate-200 rounded-xl px-2 py-1.5 bg-slate-50 text-slate-600"
            >
              <option value="all">Categorias: Todas</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Payment selector */}
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="text-[11px] font-semibold border border-slate-200 rounded-xl px-2 py-1.5 bg-slate-50 text-slate-600"
            >
              <option value="all">Status Pago: Todos</option>
              <option value="Pago">Pago</option>
              <option value="Pendente">Pendente</option>
              <option value="Atrasado">Atrasado</option>
            </select>
          </div>
        </div>

        {/* Entries Table */}
        <div className="overflow-x-auto" id="transactions-table-container">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-2">Data</th>
                <th className="py-3 px-2">Descrição</th>
                <th className="py-3 px-2">Categoria</th>
                <th className="py-3 px-2 text-right">Valor</th>
                <th className="py-3 px-2 text-center">Nota Fiscal</th>
                <th className="py-3 px-2 text-center">Status Pagamento</th>
                <th className="py-3 px-2 text-center">Responsável</th>
                <th className="py-3 px-2 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-400 text-sm">
                    Nenhuma transação encontrada para os filtros especificados.
                  </td>
                </tr>
              ) : (
                filteredEntries.map(entry => {
                  const isReceita = entry.type === 'receita';
                  const isPaid = entry.paymentStatus === 'Pago';
                  return (
                    <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Date */}
                      <td className="py-3.5 px-2 font-mono text-slate-500 whitespace-nowrap">
                        {entry.date.split('-').reverse().join('/')}
                      </td>

                      {/* Title & Notes */}
                      <td className="py-3.5 px-2 font-medium text-slate-900 max-w-[200px]">
                        <div>
                          <p className="truncate font-semibold">{entry.title}</p>
                          {entry.notes && (
                            <p className="text-[10px] text-slate-400 font-sans italic truncate" title={entry.notes}>
                              {entry.notes}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-2">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium font-sans">
                          {entry.category}
                        </span>
                      </td>

                      {/* Value */}
                      <td className={`py-3.5 px-2 text-right font-bold font-mono whitespace-nowrap ${isReceita ? 'text-orange-550' : 'text-slate-700'}`}>
                        {isReceita ? '+' : '-'} {formatBRL(entry.value)}
                      </td>

                      {/* Invoice Status */}
                      <td className="py-3.5 px-2 text-center whitespace-nowrap">
                        <button
                          onClick={() => toggleNFStatus(entry)}
                          className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border transition-colors ${
                            entry.invoiceStatus === 'Emitida' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              : entry.invoiceStatus === 'Pendente'
                                ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 animate-pulse'
                                : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
                          }`}
                          title="Clique para alternar status fiscal"
                        >
                          {entry.invoiceStatus}
                        </button>
                      </td>

                      {/* Payment Status */}
                      <td className="py-3.5 px-2 text-center whitespace-nowrap">
                        <button
                          onClick={() => togglePaymentStatus(entry)}
                          className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold transition-all border ${
                            isPaid 
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-rose-50 hover:text-rose-800 hover:border-rose-200' 
                              : 'bg-amber-100 text-amber-850 border-amber-300 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-250'
                          }`}
                          title="Clique para pagar / reabrir"
                        >
                          {isPaid ? '✓ Pago' : 'Pendente'}
                        </button>
                      </td>

                      {/* Responsible */}
                      <td className="py-3.5 px-2 text-center font-medium text-slate-600 whitespace-nowrap">
                        {entry.responsible}
                      </td>

                      {/* Operations */}
                      <td className="py-3.5 px-2 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(entry)}
                            className="p-1 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded transition-colors"
                            title="Editar Transação"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(entry.id)}
                            className="p-1 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded transition-colors"
                            title="Deletar Lançamento"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* MODAL 1: ADD NEW TRANSACTION */}
      {isAdding && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-sm w-full p-6 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800 text-md font-display">Lançar Nova Movimentação</h3>
              <button
                onClick={() => setIsAdding(false)}
                className="p-1 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateEntry} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Descrição Curta</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Pagamento Cachê Virada Campinas"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2.5 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Tipo de Fluxo</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as FinancialType)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50 focus:border-emerald-500"
                  >
                    <option value="receita">Receita (+)</option>
                    <option value="despesa">Despesa (-)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Categoria</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as FinancialCategory)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50 focus:border-emerald-500"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Valor Comercial (R$)</label>
                  <input
                    type="number"
                    required
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Data Lançamento</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Nota Fiscal</label>
                  <select
                    value={invoiceStatus}
                    onChange={(e) => setInvoiceStatus(e.target.value as FinancialEntry['invoiceStatus'])}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                  >
                    <option value="Emitida">Emitida</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Não Aplicável">Não Aplicável</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Status de Caixa</label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value as FinancialEntry['paymentStatus'])}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                  >
                    <option value="Pago">Pago / Recebido</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Atrasado">Atrasado</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <label className="block text-[11px] font-bold text-slate-500 uppercase">Responsável Lançamento</label>
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
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Anotações e detalhes internos</label>
                <textarea
                  rows={2}
                  placeholder="Observação, número da NF correspondente, forma de pagamento, etc..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors"
                >
                  Confirmar Lançamento
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

      {/* MODAL 2: EDIT TRANSACTION */}
      {isEditing && editingEntry && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-sm w-full p-6 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800 text-md font-display flex items-center gap-1">
                <Edit className="w-4 h-4 text-emerald-600" /> Editar Transação
              </h3>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleDelete(editingEntry.id)}
                  className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setIsEditing(false); setEditingEntry(null); }}
                  className="p-1 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-750 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Descrição</label>
                <input
                  type="text"
                  required
                  value={editingEntry.title}
                  onChange={(e) => setEditingEntry({ ...editingEntry, title: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Tipo</label>
                  <select
                    value={editingEntry.type}
                    onChange={(e) => setEditingEntry({ ...editingEntry, type: e.target.value as FinancialType })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                  >
                    <option value="receita">Receita (+)</option>
                    <option value="despesa">Despesa (-)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Categoria</label>
                  <select
                    value={editingEntry.category}
                    onChange={(e) => setEditingEntry({ ...editingEntry, category: e.target.value as FinancialCategory })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Valor (R$)</label>
                  <input
                    type="number"
                    required
                    value={editingEntry.value}
                    onChange={(e) => setEditingEntry({ ...editingEntry, value: Number(e.target.value) })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Data</label>
                  <input
                    type="date"
                    required
                    value={editingEntry.date}
                    onChange={(e) => setEditingEntry({ ...editingEntry, date: e.target.value })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Nota Fiscal</label>
                  <select
                    value={editingEntry.invoiceStatus}
                    onChange={(e) => setEditingEntry({ ...editingEntry, invoiceStatus: e.target.value as FinancialEntry['invoiceStatus'] })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                  >
                    <option value="Emitida">Emitida</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Não Aplicável">Não Aplicável</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Caixa</label>
                  <select
                    value={editingEntry.paymentStatus}
                    onChange={(e) => setEditingEntry({ ...editingEntry, paymentStatus: e.target.value as FinancialEntry['paymentStatus'] })}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                  >
                    <option value="Pago">Pago / Recebido</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Atrasado">Atrasado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase">Responsável</label>
                <select
                  value={editingEntry.responsible}
                  onChange={(e) => setEditingEntry({ ...editingEntry, responsible: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2 bg-slate-50"
                >
                  {teamMembers.map(tm => (
                    <option key={tm} value={tm}>{tm}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Observações</label>
                <textarea
                  rows={2}
                  value={editingEntry.notes || ''}
                  onChange={(e) => setEditingEntry({ ...editingEntry, notes: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors"
                >
                  Salvar Edição
                </button>
                <button
                  type="button"
                  onClick={() => { setIsEditing(false); setEditingEntry(null); }}
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
