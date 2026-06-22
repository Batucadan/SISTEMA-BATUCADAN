/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  KanbanSquare, 
  Calendar, 
  Briefcase, 
  DollarSign, 
  Users, 
  Music, 
  RotateCcw, 
  Menu, 
  X,
  Plus,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Map,
  Compass,
  Copyright,
  ShieldCheck,
  Workflow
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import Types
import { Pillar, Product, ContentCard, CalendarEvent, CommercialLead, FinancialEntry, TeamMember, IpAsset, CreativeApproval } from './types';

// Import Seeds
import { 
  INITIAL_PILLARS, 
  INITIAL_PRODUCTS, 
  INITIAL_CONTENT_CARDS, 
  INITIAL_CALENDAR_EVENTS, 
  INITIAL_COMMERCIAL_LEADS, 
  INITIAL_FINANCIAL_ENTRIES, 
  INITIAL_TEAM,
  INITIAL_IP_ASSETS,
  INITIAL_CREATIVE_APPROVALS
} from './data';

// Import Modular Views
import DashboardView from './components/DashboardView';
import PillarsView from './components/PillarsView';
import KanbanView from './components/KanbanView';
import CalendarView from './components/CalendarView';
import CommercialView from './components/CommercialView';
import FinanceView from './components/FinanceView';
import TeamView from './components/TeamView';
import EcossistemaView from './components/EcossistemaView';
import CatalogoView from './components/CatalogoView';
import ResponsabilidadesView from './components/ResponsabilidadesView';
import IpCenterView from './components/IpCenterView';
import DiretorCriativoView from './components/DiretorCriativoView';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // --- STATE PERSISTENCE ENGINE ---
  const [products, setProducts] = useState<Product[]>([]);
  const [contentCards, setContentCards] = useState<ContentCard[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [leads, setLeads] = useState<CommercialLead[]>([]);
  const [financials, setFinancials] = useState<FinancialEntry[]>([]);
  const [ipAssets, setIpAssets] = useState<IpAsset[]>([]);
  const [creativeApprovals, setCreativeApprovals] = useState<CreativeApproval[]>([]);
  const [team] = useState<TeamMember[]>(INITIAL_TEAM);

  // Load from Local Storage on mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('batucadan_products');
      const savedContent = localStorage.getItem('batucadan_content');
      const savedEvents = localStorage.getItem('batucadan_events');
      const savedLeads = localStorage.getItem('batucadan_leads');
      const savedFinancials = localStorage.getItem('batucadan_financials');
      const savedIpAssets = localStorage.getItem('batucadan_ip_assets');
      const savedApprovals = localStorage.getItem('batucadan_approvals');

      if (savedProducts) setProducts(JSON.parse(savedProducts));
      else setProducts(INITIAL_PRODUCTS);

      if (savedContent) setContentCards(JSON.parse(savedContent));
      else setContentCards(INITIAL_CONTENT_CARDS);

      if (savedEvents) setEvents(JSON.parse(savedEvents));
      else setEvents(INITIAL_CALENDAR_EVENTS);

      if (savedLeads) setLeads(JSON.parse(savedLeads));
      else setLeads(INITIAL_COMMERCIAL_LEADS);

      if (savedFinancials) setFinancials(JSON.parse(savedFinancials));
      else setFinancials(INITIAL_FINANCIAL_ENTRIES);

      if (savedIpAssets) setIpAssets(JSON.parse(savedIpAssets));
      else setIpAssets(INITIAL_IP_ASSETS);

      if (savedApprovals) setCreativeApprovals(JSON.parse(savedApprovals));
      else setCreativeApprovals(INITIAL_CREATIVE_APPROVALS);

    } catch (e) {
      console.error("Local Storage reading error, falling back to static seeds", e);
      setProducts(INITIAL_PRODUCTS);
      setContentCards(INITIAL_CONTENT_CARDS);
      setEvents(INITIAL_CALENDAR_EVENTS);
      setLeads(INITIAL_COMMERCIAL_LEADS);
      setFinancials(INITIAL_FINANCIAL_ENTRIES);
      setIpAssets(INITIAL_IP_ASSETS);
      setCreativeApprovals(INITIAL_CREATIVE_APPROVALS);
    }
  }, []);

  // Sync wrappers to store variables on state change
  const updateProductsState = (newProds: Product[]) => {
    setProducts(newProds);
    localStorage.setItem('batucadan_products', JSON.stringify(newProds));
  };

  const updateContentCardsState = (newCards: ContentCard[]) => {
    setContentCards(newCards);
    localStorage.setItem('batucadan_content', JSON.stringify(newCards));
  };

  const updateEventsState = (newEvents: CalendarEvent[]) => {
    setEvents(newEvents);
    localStorage.setItem('batucadan_events', JSON.stringify(newEvents));
  };

  const updateLeadsState = (newLeads: CommercialLead[]) => {
    setLeads(newLeads);
    localStorage.setItem('batucadan_leads', JSON.stringify(newLeads));
  };

  const updateFinancialsState = (newFinance: FinancialEntry[]) => {
    setFinancials(newFinance);
    localStorage.setItem('batucadan_financials', JSON.stringify(newFinance));
  };

  const updateIpAssetsState = (newAssets: IpAsset[]) => {
    setIpAssets(newAssets);
    localStorage.setItem('batucadan_ip_assets', JSON.stringify(newAssets));
  };

  const updateApprovalsState = (newApprovals: CreativeApproval[]) => {
    setCreativeApprovals(newApprovals);
    localStorage.setItem('batucadan_approvals', JSON.stringify(newApprovals));
  };

  // Reset all to default seed data
  const handleResetToSeeds = () => {
    if (confirm('Deseja realmente restaurar todos os dados e fluxos originais? Isso redefinirá suas modificações locais para os padrões de demonstração da Batucadan.')) {
      updateProductsState(INITIAL_PRODUCTS);
      updateContentCardsState(INITIAL_CONTENT_CARDS);
      updateEventsState(INITIAL_CALENDAR_EVENTS);
      updateLeadsState(INITIAL_COMMERCIAL_LEADS);
      updateFinancialsState(INITIAL_FINANCIAL_ENTRIES);
      updateIpAssetsState(INITIAL_IP_ASSETS);
      updateApprovalsState(INITIAL_CREATIVE_APPROVALS);
      alert('Dados redefinidos com sucesso para a base inicial!');
      setActiveTab('dashboard');
    }
  };

  // --- ACTIONS DISPATCHERS ---

  // Products actions
  const handleAddProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const p: Product = { ...newProd, id };
    updateProductsState([...products, p]);
  };

  const handleUpdateProduct = (updated: Product) => {
    const mapped = products.map(p => p.id === updated.id ? updated : p);
    updateProductsState(mapped);

    // cascades update product name in content cards
    const updatedCards = contentCards.map(card => {
      if (card.productId === updated.id) {
        return { ...card, productName: updated.name };
      }
      return card;
    });
    updateContentCardsState(updatedCards);
  };

  const handleDeleteProduct = (productId: string) => {
    const filtered = products.filter(p => p.id !== productId);
    updateProductsState(filtered);
    
    // remove content cards associated
    const cardFiltered = contentCards.filter(c => c.productId !== productId);
    updateContentCardsState(cardFiltered);
  };

  // Content Kanban actions
  const handleAddCard = (newCard: Omit<ContentCard, 'id'>) => {
    const id = `cc-${Date.now()}`;
    const card: ContentCard = { ...newCard, id };
    updateContentCardsState([...contentCards, card]);

    // Automatically inject a calendar event of type "postagem" / "lancamento" to sync agenda
    const isRelease = card.stage === 'Agendado' || card.stage === 'Publicado';
    if (isRelease) {
      const evId = `ev-auto-${Date.now()}`;
      const ev: CalendarEvent = {
        id: evId,
        title: `Estreia: ${card.title}`,
        date: card.deadline,
        type: card.productId === 'musica' ? 'lancamento' : 'postagem',
        responsible: card.responsible,
        description: `Criado automatico da esteira. Ref: ${card.productName}`
      };
      updateEventsState([...events, ev]);
    }
  };

  const handleUpdateCard = (updated: ContentCard) => {
    const mapped = contentCards.map(c => c.id === updated.id ? updated : c);
    updateContentCardsState(mapped);
  };

  const handleDeleteCard = (cardId: string) => {
    const filtered = contentCards.filter(c => c.id !== cardId);
    updateContentCardsState(filtered);
  };

  // Calendar actions
  const handleAddEvent = (newEvent: Omit<CalendarEvent, 'id'>) => {
    const id = `ev-${Date.now()}`;
    const ev: CalendarEvent = { ...newEvent, id };
    updateEventsState([...events, ev]);
  };

  const handleDeleteEvent = (eventId: string) => {
    const filtered = events.filter(e => e.id !== eventId);
    updateEventsState(filtered);
  };

  // Commercial funnel actions
  const handleAddLead = (newLead: Omit<CommercialLead, 'id'>) => {
    const id = `com-${Date.now()}`;
    const lead: CommercialLead = { ...newLead, id };
    updateLeadsState([...leads, lead]);

    // Automatically add a deadline event in calendar
    const evId = `ev-lead-${Date.now()}`;
    const ev: CalendarEvent = {
      id: evId,
      title: `Prazo Comercial: ${lead.client}`,
      date: lead.deadline,
      type: 'prazo',
      responsible: lead.responsible,
      description: `Etapa: ${lead.status}. Ação imediata: ${lead.nextAction}`
    };
    updateEventsState([...events, ev]);
  };

  const handleUpdateLead = (updated: CommercialLead) => {
    const mapped = leads.map(l => l.id === updated.id ? updated : l);
    updateLeadsState(mapped);

    // If deal closed won, auto-feed financial entry as a pending receipt
    if (updated.status === 'Fechado') {
      const alreadyHasFinance = financials.some(f => f.title.includes(updated.client));
      if (!alreadyHasFinance) {
        const finId = `fin-auto-${Date.now()}`;
        const newFin: FinancialEntry = {
          id: finId,
          title: `Contrato Fechado: ${updated.client}`,
          type: 'receita',
          category: updated.type === 'show' ? 'Show' : updated.type === 'oficina' ? 'Oficina' : 'Curso',
          value: updated.estimatedValue,
          date: updated.deadline,
          invoiceStatus: 'Pendente',
          paymentStatus: 'Pendente',
          responsible: updated.responsible,
          notes: `Gerado automaticamente a partir do funil de vendas ganho.`
        };
        updateFinancialsState([...financials, newFin]);
        
        // Add calendar event
        const calendarEvId = `ev-win-${Date.now()}`;
        const calendarEv: CalendarEvent = {
          id: calendarEvId,
          title: `Show/Oficina: ${updated.client}`,
          date: updated.deadline,
          type: updated.type === 'show' ? 'show' : 'oficina',
          responsible: updated.responsible,
          description: `Venda concluída de R$ ${updated.estimatedValue}. Preparar logística.`
        };
        updateEventsState([...events, calendarEv]);
      }
    }
  };

  const handleDeleteLead = (leadId: string) => {
    const filtered = leads.filter(l => l.id !== leadId);
    updateLeadsState(filtered);
  };

  // Financial ledger actions
  const handleAddEntry = (newEntry: Omit<FinancialEntry, 'id'>) => {
    const id = `fin-${Date.now()}`;
    const entry: FinancialEntry = { ...newEntry, id };
    updateFinancialsState([...financials, entry]);
  };

  const handleUpdateEntry = (updated: FinancialEntry) => {
    const mapped = financials.map(f => f.id === updated.id ? updated : f);
    updateFinancialsState(mapped);
  };

  const handleDeleteEntry = (entryId: string) => {
    const filtered = financials.filter(f => f.id !== entryId);
    updateFinancialsState(filtered);
  };

  // --- STRATEGIC ASSET & APPROVAL ACTIONS ---
  const handleAddAsset = (newAsset: Omit<IpAsset, 'id'>) => {
    const id = `ip-${Date.now()}`;
    updateIpAssetsState([...ipAssets, { ...newAsset, id }]);
  };

  const handleDeleteAsset = (id: string) => {
    updateIpAssetsState(ipAssets.filter(item => item.id !== id));
  };

  const handleUpdateApprovalStatus = (id: string, newStatus: 'Aprovado' | 'Recusado' | 'Pendente') => {
    updateApprovalsState(creativeApprovals.map(ap => ap.id === id ? { ...ap, status: newStatus } : ap));
  };

  const handleAddApproval = (newAp: Omit<CreativeApproval, 'id'>) => {
    const id = `ap-${Date.now()}`;
    updateApprovalsState([...creativeApprovals, { ...newAp, id }]);
  };

  const handleDeleteApproval = (id: string) => {
    updateApprovalsState(creativeApprovals.filter(ap => ap.id !== id));
  };

  // Helper arrays
  const teamNames = team.map(t => t.name);

  // --- RENDERING TABS SWITCH ---
  const renderTabContent = () => {
    switch (activeTab) {
      case 'ecossistema':
        return <EcossistemaView products={products} />;
      case 'catalogo':
        return (
          <CatalogoView 
            products={products} 
            onAddProduct={handleAddProduct} 
            onDeleteProduct={handleDeleteProduct} 
            teamMembers={teamNames} 
          />
        );
      case 'responsabilidades':
        return <ResponsabilidadesView />;
      case 'ip-center':
        return (
          <IpCenterView 
            assets={ipAssets} 
            onAddAsset={handleAddAsset} 
            onDeleteAsset={handleDeleteAsset} 
            teamMembers={teamNames} 
          />
        );
      case 'diretor-criativo':
        return (
          <DiretorCriativoView 
            approvals={creativeApprovals} 
            onUpdateStatus={handleUpdateApprovalStatus} 
            onAddApproval={handleAddApproval} 
            onDeleteApproval={handleDeleteApproval} 
            teamMembers={teamNames} 
          />
        );
      case 'dashboard':
        return (
          <DashboardView 
            contentCards={contentCards} 
            events={events} 
            leads={leads} 
            financials={financials}
            onNavigate={(tab) => {
              setActiveTab(tab);
              setIsSidebarOpen(false);
            }}
          />
        );
      case 'produtos':
        return (
          <PillarsView 
            pillars={INITIAL_PILLARS} 
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            teamMembers={teamNames}
          />
        );
      case 'produção':
        return (
          <KanbanView 
            contentCards={contentCards} 
            products={products}
            onAddCard={handleAddCard}
            onUpdateCard={handleUpdateCard}
            onDeleteCard={handleDeleteCard}
            teamMembers={teamNames}
          />
        );
      case 'calendário':
        return (
          <CalendarView 
            events={events}
            onAddEvent={handleAddEvent}
            onDeleteEvent={handleDeleteEvent}
            teamMembers={teamNames}
          />
        );
      case 'comercial':
        return (
          <CommercialView 
            leads={leads}
            onAddLead={handleAddLead}
            onUpdateLead={handleUpdateLead}
            onDeleteLead={handleDeleteLead}
            teamMembers={teamNames}
          />
        );
      case 'financeiro':
        return (
          <FinanceView 
            financials={financials}
            onAddEntry={handleAddEntry}
            onUpdateEntry={handleUpdateEntry}
            onDeleteEntry={handleDeleteEntry}
            teamMembers={teamNames}
          />
        );
      case 'equipe':
        return (
          <TeamView 
            team={team} 
            contentCards={contentCards} 
            events={events} 
          />
        );
      default:
        return <div className="text-center py-10 font-bold">Aba não encontrada</div>;
    }
  };

  const strategicMenuItems = [
    { id: 'ecossistema', label: 'Ecossistema Batucadan', icon: <Compass className="w-4 h-4" /> },
    { id: 'catalogo', label: 'Catálogo e Processos', icon: <Workflow className="w-4 h-4" /> },
    { id: 'responsabilidades', label: 'Matriz de Cargos', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'ip-center', label: 'Centro de IP', icon: <Copyright className="w-4 h-4" /> },
  ];

  const operationalMenuItems = [
    { id: 'dashboard', label: 'Painel Geral', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'produção', label: 'Esteira de Conteúdo', icon: <KanbanSquare className="w-4 h-4" /> },
    { id: 'calendário', label: 'Agenda Integrada', icon: <Calendar className="w-4 h-4" /> },
    { id: 'comercial', label: 'Funil Comercial', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'financeiro', label: 'Financeiro', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'equipe', label: 'Equipe e Metas', icon: <Users className="w-4 h-4" /> },
  ];

  const directorMenuItems = [
    { id: 'diretor-criativo', label: 'Mesa do Diretor', icon: <Sparkles className="w-4 h-4" /> },
  ];

  const renderNavSection = (title: string, items: typeof strategicMenuItems) => (
    <div className="space-y-1.5 pt-4 first:pt-0">
      <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 pl-3 md:pl-2.5 block font-display">
        {title}
      </span>
      {items.map(item => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left text-xs font-semibold tracking-wide border transition-all ${
              isActive 
                ? 'bg-orange-500/10 text-orange-400 border-orange-500/20 shadow-xs font-bold' 
                : 'border-transparent hover:bg-slate-800/60 hover:text-slate-100 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.label}</span>
            </div>
            {isActive && <ChevronRight className="w-3.5 h-3.5 text-orange-400" />}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800" id="batucadan-root">
      
      {/* MOBILE HEADER BAR */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-slate-200 px-4 py-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
            <Music className="w-4.5 h-4.5" />
          </div>
          <span className="font-bold tracking-tight font-display text-slate-900 text-lg">Batucadan OS</span>
        </div>

        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1.5 border border-slate-200 rounded-lg text-slate-600 bg-slate-50"
          title="Toggle Menu"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* SIDEBAR NAVIGATION PANEL (Static desktop, collapsible mobile) */}
      <div className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 sidebar-gradient text-slate-300 border-r border-slate-800 flex flex-col justify-between shrink-0 transition-transform duration-200 ease-in-out z-40 shadow-xl md:shadow-none
      `} id="batucadan-sidebar">
        
        <div className="flex flex-col flex-1 pl-4 pr-3 pt-6 overflow-y-auto">
          {/* Logo Brand / Workspace Name */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-orange-500/20 shrink-0">
              B
            </div>
            <div>
              <h2 className="font-bold text-md tracking-tight font-display text-white">Batucadan OS</h2>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Operações</span>
            </div>
          </div>

          {/* Nav List links */}
          <nav className="space-y-4 flex-1">
            {renderNavSection('Diretoria', directorMenuItems)}
            {renderNavSection('Estratégico', strategicMenuItems)}
            {renderNavSection('Operacional', operationalMenuItems)}
          </nav>
        </div>

        {/* Footer actions of Sidebar with custom profile */}
        <div className="p-4 border-t border-slate-800 space-y-3 shrink-0">
          <div className="flex items-center gap-3 px-3 py-1">
            <div className="w-8 h-8 rounded-full bg-slate-700 font-bold text-xs flex items-center justify-center text-white select-none">
              DA
            </div>
            <div>
              <p className="text-xs font-bold text-white">Danilo</p>
              <p className="text-[10px] text-slate-550 uppercase font-semibold">Diretor Criativo</p>
            </div>
          </div>

          <button
            onClick={handleResetToSeeds}
            className="w-full flex items-center justify-center gap-2 py-2 border border-slate-800 hover:border-slate-700 bg-slate-800/35 text-[11px] font-semibold text-slate-400 hover:text-slate-200 rounded-xl transition-all"
            title="Redefinir dados"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Redefinir Demonstração
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY SHIELD */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-30 md:hidden"
        />
      )}

      {/* MAIN VIEWPORT BODY */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8" id="batucadan-workspace">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="max-w-[1300px] mx-auto pb-12"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  );
}
