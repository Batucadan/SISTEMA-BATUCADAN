import React, { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Map, 
  Sparkles, 
  Layers, 
  Compass, 
  Award, 
  Database,
  Tv,
  BookOpen,
  Milestone,
  ArrowRight,
  Globe,
  Radio,
  Play,
  Volume2
} from 'lucide-react';
import { motion } from 'motion/react';
import { Product, PillarId } from '../types';

interface EcossistemaViewProps {
  products: Product[];
}

export default function EcossistemaView({ products }: EcossistemaViewProps) {
  const [activeSegment, setActiveSegment] = useState<'mapa' | 'roadmap'>('mapa');
  const [selectedPillar, setSelectedPillar] = useState<PillarId | 'all'>('all');

  // Indicators mapping
  const entretenimentoIndicators = [
    { label: 'Receita Streaming', value: 'R$ 14.500/mês', change: '+12% este mês', icon: <Volume2 className="w-4 h-4 text-orange-500" /> },
    { label: 'Receita YouTube', value: 'R$ 28.200/mês', change: '+8% vs anterior', icon: <Tv className="w-4 h-4 text-orange-500" /> },
    { label: 'Audiência Geral', value: '1.2M visualizações', change: 'Média de retenção de 68%', icon: <TrendingUp className="w-4 h-4 text-orange-500" /> },
    { label: 'Inscritos de Canais', value: '380.000 inscritos', change: '+15k novos inscritos', icon: <Users className="w-4 h-4 text-orange-500" /> },
    { label: 'Ouvintes Mensais', value: '112.000 no Spotify', change: 'Pico de 145k no lançamento', icon: <Sparkles className="w-4 h-4 text-orange-500" /> },
  ];

  const formativoIndicators = [
    { label: 'Alunos Matriculados', value: '1.850 educadores', change: '84% de taxa de conclusão', icon: <Users className="w-4 h-4 text-violet-500" /> },
    { label: 'Escolas Atendidas', value: '45 colégios / secretarias', change: 'Treinamentos homologados SP/RJ', icon: <Building2 className="w-4 h-4 text-violet-500" /> },
    { label: 'Receita Direta', value: 'R$ 62.000/bimestre', change: 'Cursos + Palestras físicas', icon: <TrendingUp className="w-4 h-4 text-violet-500" /> },
    { label: 'Participantes Ativos', value: '3.400 capacitados', change: 'Fórum da comunidade com 90% engajamento', icon: <Award className="w-4 h-4 text-violet-500" /> },
  ];

  const pedagogicoIndicators = [
    { label: 'Escolas Parceiras', value: '18 contratos ativos', change: 'Renovação automática anual de 92%', icon: <Building2 className="w-4 h-4 text-emerald-500" /> },
    { label: 'Crianças Impactadas', value: '8.500 alunos/semana', change: 'Ritmo, percussão e alegria', icon: <Users className="w-4 h-4 text-emerald-500" /> },
    { label: 'Receita Licenciamento', value: 'R$ 41.000/mês', change: 'Coleção Ritmos da Terra inclusa', icon: <TrendingUp className="w-4 h-4 text-emerald-500" /> },
    { label: 'Projetos de Apoio Ativos', value: '5 mostras pedagógicas', change: 'Espetáculos teatrais municipais', icon: <BookOpen className="w-4 h-4 text-emerald-500" /> },
  ];

  return (
    <div className="space-y-6" id="view-ecossistema">
      {/* View Header with Tab Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[10px] bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            Estratégia & Visão Comercial
          </span>
          <h1 className="text-3xl font-bold font-display tracking-tight text-slate-800 mt-1">
            Ecossistema Batucadan
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Mapeamento vivo das engrenagens corporativas: Pilares estratégicos, conexões e roadmap.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-slate-100 border border-slate-200 p-1 rounded-xl shrink-0 self-start md:self-auto shadow-2xs">
          <button
            onClick={() => setActiveSegment('mapa')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSegment === 'mapa'
                ? 'bg-white text-slate-800 shadow-xs ring-1 ring-slate-900/5'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Mapa Estratégico
          </button>
          <button
            onClick={() => setActiveSegment('roadmap')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSegment === 'roadmap'
                ? 'bg-white text-slate-800 shadow-xs ring-1 ring-slate-900/5'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Milestone className="w-3.5 h-3.5" />
            Roadmap de Expansão
          </button>
        </div>
      </div>

      {activeSegment === 'mapa' ? (
        <div className="space-y-8 animate-fadeIn">
          {/* Objective Explainer */}
          <div className="bg-gradient-to-r from-orange-500/5 via-violet-500/2 to-indigo-500/5 border border-slate-150 rounded-2xl p-4 flex gap-4 items-center">
            <div className="p-2.5 bg-white border border-slate-100 rounded-xl text-orange-500 shadow-sm shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700">Mapeamento da Organização: Pilares → Produtos → Resultados</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Esta tela representa a engrenagem vital do Batucadan. Cada pilar apoia produtos complementares que alimentam indicadores chave de sucesso físico e digital.
              </p>
            </div>
          </div>

          {/* Pillars Carousel/Grid Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. PILLAR ENTERTENIMENTO */}
            <div 
              onClick={() => setSelectedPillar('entretenimento')}
              className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between h-64 shadow-xs hover:shadow-md ${
                selectedPillar === 'entretenimento'
                  ? 'bg-white border-orange-500 ring-2 ring-orange-500/20'
                  : 'bg-white/90 border-slate-200/80 hover:border-orange-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-orange-50 border border-orange-200 text-orange-700 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Pilar 1
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold">
                    EP
                  </div>
                </div>
                <h3 className="text-lg font-bold font-display text-slate-800 mt-4 flex items-center gap-1.5">
                  <Play className="w-4 h-4 text-orange-500" />
                  Entretenimento
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  <strong>Objetivo:</strong> Encantar crianças e famílias brasileiras através da mágica musical, estímulo visual lúdico e apresentações ao vivo cativantes.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-500 font-mono">
                  {products.filter(p => p.pillarId === 'entretenimento').length} Produtos
                </span>
                <span className="text-orange-500 font-bold flex items-center gap-0.5">
                  Ver Indicadores <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* 2. PILLAR FORMATIVO */}
            <div 
              onClick={() => setSelectedPillar('formativo')}
              className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between h-64 shadow-xs hover:shadow-md ${
                selectedPillar === 'formativo'
                  ? 'bg-white border-violet-500 ring-2 ring-violet-500/20'
                  : 'bg-white/90 border-slate-200/80 hover:border-violet-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-violet-50 border border-violet-200 text-violet-700 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Pilar 2
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-500 font-bold">
                    FP
                  </div>
                </div>
                <h3 className="text-lg font-bold font-display text-slate-800 mt-4 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-violet-500" />
                  Formativo
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  <strong>Objetivo:</strong> Capacitar adultos mediadores, professores e educadores com nosso método autoral de musicalização infantil prática e inclusiva.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-500 font-mono">
                  {products.filter(p => p.pillarId === 'formativo').length} Produtos
                </span>
                <span className="text-violet-500 font-bold flex items-center gap-0.5">
                  Ver Indicadores <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* 3. PILLAR PEDAGÓGICO */}
            <div 
              onClick={() => setSelectedPillar('pedagogico')}
              className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between h-64 shadow-xs hover:shadow-md ${
                selectedPillar === 'pedagogico'
                  ? 'bg-white border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'bg-white/90 border-slate-200/80 hover:border-emerald-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Pilar 3
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold">
                    PP
                  </div>
                </div>
                <h3 className="text-lg font-bold font-display text-slate-800 mt-4 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-500" />
                  Pedagógico
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  <strong>Objetivo:</strong> Ensinar e formar através da musicalidade integrada e brinquedos rítmicos complementares direto nas salas de aulas.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-500 font-mono">
                  {products.filter(p => p.pillarId === 'pedagogico').length} Produtos
                </span>
                <span className="text-emerald-500 font-bold flex items-center gap-0.5">
                  Ver Indicadores <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

          </div>

          {/* Connected Grid: Selected pillar indicator + Products Mapping */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left side products under selected pillar */}
            <div className="lg:col-span-2 bg-white border border-slate-150 rounded-3xl p-5 shadow-xs">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm font-display uppercase tracking-wide flex items-center gap-2">
                    <Database className="w-4.5 h-4.5 text-orange-500" />
                    Produtos Estruturais Vivos {selectedPillar !== 'all' ? `(${selectedPillar})` : ''}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Gargalos operacionais e direcionamento.</p>
                </div>
                {selectedPillar !== 'all' && (
                  <button 
                    onClick={() => setSelectedPillar('all')}
                    className="text-[10px] bg-slate-100 hover:bg-slate-200 font-semibold px-2.5 py-1 rounded-lg transition-colors text-slate-600"
                  >
                    Mostrar Todos
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5">
                {products
                  .filter(p => selectedPillar === 'all' || p.pillarId === selectedPillar)
                  .map(p => (
                    <div 
                      key={p.id} 
                      className={`p-4 border rounded-2xl flex flex-col justify-between bg-slate-50/50 hover:bg-white transition-all hover:shadow-xs group border-slate-200/60`} 
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-slate-800 truncate pr-1 group-hover:text-orange-500 transition-colors">
                            {p.name}
                          </h4>
                          <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                            p.pillarId === 'entretenimento' 
                              ? 'bg-orange-50 text-orange-700' 
                              : p.pillarId === 'formativo' ? 'bg-violet-50 text-violet-700' : 'bg-emerald-50 text-emerald-700'
                          }`}>
                            {p.pillarId}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1 lines-clamp-2 leading-relaxed">
                          {p.objective}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 gap-1 mt-3 flex items-center justify-between text-[9px] text-slate-400">
                        <span className="truncate"><strong>Canal:</strong> {p.channel}</span>
                        <span className="font-semibold text-slate-600 shrink-0 bg-slate-100 px-1.5 py-0.5 rounded">
                          {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Right side strategic results metric cards */}
            <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-sm min-h-[300px] flex flex-col justify-between">
              <div>
                <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm tracking-wide text-white uppercase font-display flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-orange-500" />
                      Painel de Resultados Estáveis
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Indicadores do Pilar focado.</p>
                  </div>
                </div>

                {/* Metrics list */}
                <div className="space-y-4 mt-5">
                  {(selectedPillar === 'all' || selectedPillar === 'entretenimento') && (
                    <div className="space-y-3.5">
                      <span className="text-[9px] uppercase tracking-wider text-orange-400 font-extrabold block">
                        Resultados: Entretenimento
                      </span>
                      {entretenimentoIndicators.map((e, index) => (
                        <div key={index} className="flex items-start gap-3 bg-slate-800/40 p-2.5 border border-slate-800/60 rounded-xl">
                          <div className="p-1.5 bg-orange-500/10 rounded-lg text-orange-500 mt-0.5">
                            {e.icon}
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] text-slate-400 block">{e.label}</span>
                            <span className="text-xs font-bold font-mono text-white mt-0.5 block">{e.value}</span>
                            <span className="text-[9px] font-semibold text-emerald-400 block mt-0.5">{e.change}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedPillar === 'formativo' && (
                    <div className="space-y-3.5">
                      <span className="text-[9px] uppercase tracking-wider text-violet-400 font-extrabold block">
                        Resultados: Formativo
                      </span>
                      {formativoIndicators.map((e, index) => (
                        <div key={index} className="flex items-start gap-3 bg-slate-800/40 p-2.5 border border-slate-800/60 rounded-xl">
                          <div className="p-1.5 bg-violet-500/10 rounded-lg text-violet-400 mt-0.5">
                            {e.icon}
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] text-slate-400 block">{e.label}</span>
                            <span className="text-xs font-bold font-mono text-white mt-0.5 block">{e.value}</span>
                            <span className="text-[9px] font-semibold text-emerald-400 block mt-0.5">{e.change}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedPillar === 'pedagogico' && (
                    <div className="space-y-3.5">
                      <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-extrabold block">
                        Resultados: Pedagógico
                      </span>
                      {pedagogicoIndicators.map((e, index) => (
                        <div key={index} className="flex items-start gap-3 bg-slate-800/40 p-2.5 border border-slate-800/60 rounded-xl">
                          <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-500 mt-0.5">
                            {e.icon}
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] text-slate-400 block">{e.label}</span>
                            <span className="text-xs font-bold font-mono text-white mt-0.5 block">{e.value}</span>
                            <span className="text-[9px] font-semibold text-emerald-400 block mt-0.5">{e.change}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-orange-500 status-pulse" />
                <span>Atualizado com base nas métricas reais de AdSense, Hotmart e Contratos.</span>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-fadeIn" id="expansion-roadmap">
          {/* Objective Explainer */}
          <div className="bg-gradient-to-r from-orange-500/5 via-violet-500/2 to-indigo-500/5 border border-slate-150 rounded-2xl p-4 flex gap-4 items-center">
            <div className="p-2.5 bg-white border border-slate-100 rounded-xl text-orange-500 shadow-sm shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700">Roadmap Corporativo de Expansão e Licenciamento</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Organize os produtos Ativos, os produtos em Desenvolvimento no funil criativo e planeje os próximos marcos de escalada do Batucadan.
              </p>
            </div>
          </div>

          <div className="relative">
            {/* Timeline Line Vertical */}
            <div className="absolute left-4 md:left-[50%] top-2 bottom-2 md:w-0.5 bg-slate-200 border-dashed" />

            <div className="space-y-12">
              
              {/* Point 1: HOJE (Ativos) */}
              <div className="relative flex flex-col md:flex-row items-start md:justify-between group">
                {/* Timeline dot */}
                <div className="absolute left-1 md:left-[50%] md:-translate-x-1/2 w-6 h-6 border-4 border-slate-50 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-md z-10" />

                <div className="md:w-[45%] pl-10 md:pl-0 md:text-right pr-4">
                  <span className="text-[10px] bg-orange-100/70 text-orange-800 px-2 py-0.5 rounded-full font-extrabold uppercase font-mono">
                    Março / Junho 2026 (Ativo)
                  </span>
                  <h3 className="text-lg font-bold font-display text-slate-800 mt-2">Hoje: Entrega Constante</h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Foco nos canais consolidados, shows programados e captação municipal orgânica. Lançamentos regulares de vídeos, palestras de Danilo qualificadas e faturamento em dia.
                  </p>
                </div>

                <div className="md:w-[45%] pl-10 md:pl-8 mt-4 md:mt-0">
                  <div className="bg-white border border-slate-150 p-4 rounded-2xl shadow-2xs space-y-2">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold block">Ativos de Operação Frequente:</span>
                    <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-slate-600 font-sans">
                      <li className="flex items-center gap-1">✓ Música Comercial</li>
                      <li className="flex items-center gap-1">✓ Canal YouTube</li>
                      <li className="flex items-center gap-1">✓ Videoclipes</li>
                      <li className="flex items-center gap-1">✓ Shows ao Vivo</li>
                      <li className="flex items-center gap-1">✓ Palestras B2B</li>
                      <li className="flex items-center gap-1">✓ Oficinas Musicais</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Point 2: PRÓXIMOS 12 MESES (Desenvolvimento) */}
              <div className="relative flex flex-col md:flex-row-reverse items-start md:justify-between group">
                {/* Timeline dot */}
                <div className="absolute left-1 md:left-[50%] md:-translate-x-1/2 w-6 h-6 border-4 border-slate-50 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full shadow-md z-10" />

                <div className="md:w-[45%] pl-10 md:pl-8 pr-4 text-left">
                  <span className="text-[10px] bg-violet-100/70 text-violet-800 px-2 py-0.5 rounded-full font-extrabold uppercase font-mono">
                    Próximos 12 meses (Em Desenvolvimento)
                  </span>
                  <h3 className="text-lg font-bold font-display text-slate-800 mt-2">Expansão de Infoprodutos e Personagens</h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Série de micro-animações, e-commerce com kits rítmicos integrados físicos e expansão do portifólio de franqueados licenciados.
                  </p>
                </div>

                <div className="md:w-[45%] pl-10 md:pl-0 md:text-right mt-4 md:mt-0 pr-0 md:pr-8">
                  <div className="bg-white border border-slate-150 p-4 rounded-2xl shadow-2xs space-y-2">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold block">Foco no Pipeline Estratégico:</span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-1 text-[10px] text-slate-600 font-sans text-left md:text-right">
                      <li className="flex md:flex-row-reverse items-center gap-1">⚒ BatuCartoon Animações</li>
                      <li className="flex md:flex-row-reverse items-center gap-1">⚒ Plataforma Educar pelo Brincar v2</li>
                      <li className="flex md:flex-row-reverse items-center gap-1">⚒ Loja de Kits Instrumentais</li>
                      <li className="flex md:flex-row-reverse items-center gap-1">⚒ Lançamento Combo de Livros 4 e 5</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Point 3: FUTURO (Estratégico Licenciamento e Franquia) */}
              <div className="relative flex flex-col md:flex-row items-start md:justify-between group">
                {/* Timeline dot */}
                <div className="absolute left-1 md:left-[50%] md:-translate-x-1/2 w-6 h-6 border-4 border-slate-50 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-md z-10" />

                <div className="md:w-[45%] pl-10 md:pl-0 md:text-right pr-4">
                  <span className="text-[10px] bg-emerald-100/70 text-emerald-800 px-2 py-0.5 rounded-full font-extrabold uppercase font-mono">
                    A Longo Prazo (Visão Futuro)
                  </span>
                  <h3 className="text-lg font-bold font-display text-slate-800 mt-2">Franquias e Licenciamento Industrial</h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Homologar no INPI franquias locais de escolas "Batucadan Kids", brinquedos físicos comercializados em massa nacionalmente (chocalhos, flautas rítmicas) e aplicativo com gamificação rítmica assistida por IA.
                  </p>
                </div>

                <div className="md:w-[45%] pl-10 md:pl-8 mt-4 md:mt-0">
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-white shadow-2xs space-y-2">
                    <span className="text-[9px] uppercase tracking-wider text-slate-450 font-extrabold block">Alvos de Alto Impacto / Monetização:</span>
                    <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-slate-300 font-sans">
                      <li className="flex items-center gap-1 text-emerald-400">⚡ Brinquedos Físicos</li>
                      <li className="flex items-center gap-1 text-emerald-400">⚡ Franquia Pedagógica</li>
                      <li className="flex items-center gap-1 text-emerald-400">⚡ Aplicativo Gamificado</li>
                      <li className="flex items-center gap-1 text-emerald-400">⚡ Sistema de Apoio a Escolas</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
