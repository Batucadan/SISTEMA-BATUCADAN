/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Operational Pillars
export type PillarId = 'entretenimento' | 'formativo' | 'pedagogico';

export interface Product {
  id: string;
  name: string;
  pillarId: PillarId;
  objective: string;
  channel: string;
  frequency: string;
  responsible: string;
  status: 'Ativo' | 'Pausado' | 'Em Planejamento';
  revenueType: 'Direta' | 'Indireta' | 'Mista';
  revenueSourceDescription: string;
  kpiPrincipal?: string;
  fluxo?: string[];
  receitaDireta?: string;
  receitaIndireta?: string;
}

export interface Pillar {
  id: PillarId;
  name: string;
  description: string;
  icon: string;
  products: Product[];
}

// Kanban Content Production
export type ContentStage = 
  | 'Ideia' 
  | 'Roteiro' 
  | 'Em produção' 
  | 'Em edição' 
  | 'Em revisão Danilo' 
  | 'Pronto' 
  | 'Agendado' 
  | 'Publicado';

export interface ContentCard {
  id: string;
  productId: string; // references Product.id
  productName: string;
  title: string;
  responsible: string; // team member name
  deadline: string; // YYYY-MM-DD
  channel: string; // e.g. YouTube, Instagram, TikTok, etc.
  fileLink: string; // link / file path reference
  stage: ContentStage;
  notes: string;
  priority: 'Baixa' | 'Média' | 'Alta';
}

// Calendar Events
export type EventType = 
  | 'postagem' 
  | 'lancamento' 
  | 'show' 
  | 'oficina' 
  | 'reuniao' 
  | 'prazo';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  type: EventType;
  responsible: string;
  description: string;
  time?: string; // HH:MM
}

// Commercial Leads
export type CommercialStage = 
  | 'Lead' 
  | 'Primeiro contato' 
  | 'Proposta enviada' 
  | 'Negociação' 
  | 'Fechado' 
  | 'Perdido';

export type OpportunityType = 'show' | 'oficina' | 'palestra' | 'projeto escolar' | 'parceria';

export interface CommercialLead {
  id: string;
  client: string;
  type: OpportunityType;
  estimatedValue: number;
  responsible: string;
  nextAction: string;
  deadline: string; // YYYY-MM-DD
  status: CommercialStage;
  phone?: string;
  email?: string;
  notes?: string;
}

// Financial Entries
export type FinancialType = 'receita' | 'despesa';
export type FinancialCategory = 
  | 'Show' 
  | 'Oficina' 
  | 'Curso' 
  | 'Livros-Materiais' 
  | 'AdSense-YouTube' 
  | 'Royalty-Música' 
  | 'Impostos' 
  | 'Produção-Edição' 
  | 'Marketing' 
  | 'Funcionários-Equipe' 
  | 'Administrativo';

export interface FinancialEntry {
  id: string;
  title: string;
  type: FinancialType;
  category: FinancialCategory;
  value: number;
  date: string; // YYYY-MM-DD
  invoiceStatus: 'Emitida' | 'Pendente' | 'Não Aplicável';
  paymentStatus: 'Pago' | 'Pendente' | 'Atrasado';
  responsible: string;
  notes?: string;
}

// Team Members
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  responsibilities: string[];
  avatar: string; // Initials or local visual
  color: string; // Tailwind color class combination
}

// IP Assets (Centro de IP)
export interface IpAsset {
  id: string;
  name: string;
  category: 'Marca' | 'Personagem' | 'Música' | 'Livro' | 'Metodologia' | 'Série Animada';
  quantity: number | string;
  status: 'Ativo e Registrado' | 'Em Registro' | 'Em Criação' | 'Sob Licenciamento';
  responsible: string;
  monetizationPotential: 'Baixo' | 'Médio' | 'Alto' | 'Altíssimo';
  description: string;
  estimatedValue?: string;
}

// Creative Approvals & Submissions for Danilo (Creative Director Panel)
export interface CreativeApproval {
  id: string;
  title: string;
  type: 'Roteiro' | 'Música' | 'Arte/Animação' | 'Proposta Comercial' | 'Decisão Estratégica' | 'Novo Produto' | 'Ideia';
  productName: string;
  requestedBy: string;
  date: string;
  status: 'Pendente' | 'Aprovado' | 'Recusado';
  notes?: string;
  contentReference?: string;
}

