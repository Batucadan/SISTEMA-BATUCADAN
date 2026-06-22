import React, { useState } from 'react';
import { 
  Users, 
  UserSquare2, 
  AlertTriangle, 
  CheckCircle, 
  ShieldCheck, 
  Settings, 
  CornerDownRight, 
  Zap, 
  HelpCircle,
  TrendingDown,
  Info
} from 'lucide-react';

export default function ResponsabilidadesView() {
  const [selectedMember, setSelectedMember] = useState<string>('all');

  // Hardcoded matrix items mapping
  const matrixItems = [
    {
      product: 'Música Commercial',
      danilo: 'Composição e Produção de Áudio',
      sora: 'Distribuição digital',
      risael: 'Mixagem e Masterização final',
      rulio: 'Social Media / Divulgação',
      contabilidade: 'Recebimento de Royalties / Ecad',
      isFounderGargalo: true,
    },
    {
      product: 'BatuCartoon Animado',
      danilo: 'Roteiros e Homologação de Dublagem',
      sora: 'Negociação de Licenciamento',
      risael: 'Produção das micro-animações',
      rulio: 'Divulgação orgânica no TikTok',
      contabilidade: 'Contratos e impostos industriais',
      isFounderGargalo: true,
    },
    {
      product: 'Shorts Kids (YouTube)',
      danilo: 'Cria piada rítmica se necessário',
      sora: 'Análise de métricas',
      risael: 'Não',
      rulio: 'Seleção de cortes e legenda ágil',
      contabilidade: 'Não',
      isFounderGargalo: false,
    },
    {
      product: 'Videoclipes Musicais',
      danilo: 'Criação de letras e Direção Artística',
      sora: 'Logística de estúdios e locação',
      risael: 'Gravação física e edição geral',
      rulio: 'Corte de divulgação e trailers',
      contabilidade: 'Fechamento fiscal de estúdios',
      isFounderGargalo: true,
    },
    {
      product: 'Shows ao Vivo',
      danilo: 'Apresentação Principal (Performers)',
      sora: 'Vendas, assessoria e faturamento',
      risael: 'Controle de som e luz / Rider',
      rulio: 'Divulgação local e mídias',
      contabilidade: 'Emissão de notas fiscais contratuais',
      isFounderGargalo: true,
    },
    {
      product: 'Palestras Formativas',
      danilo: 'Palestrante Único e Autoridade',
      sora: 'Venda de pacotes, agenda e voos',
      risael: 'Não',
      rulio: 'Suporte de slides',
      contabilidade: 'Impostos e arrecadação Simples',
      isFounderGargalo: true,
    },
    {
      product: 'Cursos Online',
      danilo: 'Aulas didáticas e concepção teórica',
      sora: 'Suporte pedagógico complementar',
      risael: 'Captação de áudio e edição video',
      rulio: 'Suporte Hotmart, Tráfego pago',
      contabilidade: 'Conciliação de recebíveis da Hotmart',
      isFounderGargalo: false,
    },
    {
      product: 'Oficinas Escolares',
      danilo: 'Direção pedagógica do Método',
      sora: 'Prospecção B2B secundária',
      risael: 'Ministra as aulas e contação',
      rulio: 'Apoio logístico local',
      contabilidade: 'Fechamento mensal de prestação',
      isFounderGargalo: false,
    },
    {
      product: 'Projetos de Licenciamento',
      danilo: 'Criação conceitual',
      sora: 'Gestora Comercial chefe',
      risael: 'Formatos digitais de apoio',
      rulio: 'Atendimento operacional',
      contabilidade: 'Comissionamento e guias de imposto',
      isFounderGargalo: false,
    },
    {
      product: 'Livros Pedagógicos',
      danilo: 'Escrita, áudios e QR-Codes',
      sora: 'Logística de impressão interna',
      risael: 'Diagramação de apoio',
      rulio: 'Marketing e e-commerce',
      contabilidade: 'Direitos autorais de tiragem',
      isFounderGargalo: true,
    }
  ];

  // Calculate stats to isolate bottlenecks
  const totalProducts = matrixItems.length;
  const founderCriticalTasks = matrixItems.filter(item => item.isFounderGargalo).length;
  const dependencePercent = Math.round((founderCriticalTasks / totalProducts) * 105); // slight scale for visual emphasis

  return (
    <div className="space-y-6" id="view-responsabilidades">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[10px] bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            Matriz de Responsabilidade v2
          </span>
          <h1 className="text-3xl font-bold font-display tracking-tight text-slate-800 mt-1">
            Matriz de Responsabilidades (Quem faz o quê)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Destaque as responsabilidades detalhadas de cada membro por produto para auditar gargalos estruturais de escala.
          </p>
        </div>
      </div>

      {/* Alerta de Gargalo / Founder Dependency Indicator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric gauge */}
        <div className="bg-red-50 border border-red-200 rounded-3xl p-5 flex flex-col justify-between md:col-span-1 shadow-2xs">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-red-650 font-display">Auditoria Corporativa</span>
              <h4 className="text-sm font-bold text-slate-800 mt-1">Dependência do Fundador</h4>
            </div>
            <div className="p-2.5 bg-red-100/55 rounded-xl text-red-600 shrink-0">
              <AlertTriangle className="w-5 h-5 status-pulse" />
            </div>
          </div>

          <div className="my-4">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold font-mono text-red-600">{dependencePercent}%</span>
              <span className="text-xs text-slate-500">De sobrecarga cênica</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full mt-2.5 overflow-hidden">
              <div className="bg-red-500 h-full rounded-full transition-all" style={{ width: `${Math.min(dependencePercent, 100)}%` }} />
            </div>
          </div>

          <p className="text-[10px] text-red-700/90 leading-tight">
            <strong>Risco Identificado:</strong> Danilo (Fundador) lidera ou valida diretamente <strong>{founderCriticalTasks} de {totalProducts}</strong> frentes ativas corporativas, criando um ponto único de falha operacional.
          </p>
        </div>

        {/* Diagnostic box */}
        <div className="bg-slate-900 text-white rounded-3xl p-5 md:col-span-2 shadow-2xs flex flex-col justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-orange-400 font-extrabold font-display">Tática de Descentração</span>
            <h4 className="text-md font-bold text-white mt-1">Caminhos da Descentralização Criativa</h4>
            
            <div className="my-3.5 space-y-2 text-[11px] text-slate-300">
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <p>
                  <strong>Formações Presenciais:</strong> Sora tem capacidade de conduzir fendas de agenda do pilar formativo no atacado.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <p>
                  <strong>Oficinas Escolares:</strong> Risael já Consegue ministrar e percutir aulas rítmicas com autonomia de encerramento de meses.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <p>
                  <strong>Edições e Legendas:</strong> Rulio assumiu a esteira ágil de cortes dos Shorts Kids, desafogando os roteiros operacionais.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400 flex items-center gap-1.5 leading-none">
            <Info className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Sora e Risael devem ser comissionados por autonomia pedagógica.</span>
          </div>
        </div>

      </div>

      {/* Main Interactive Matriz Grid Table */}
      <div className="bg-white border border-slate-150 rounded-3xl overflow-hidden shadow-2xs flex flex-col" id="responsibility-matrix-table">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-bold text-slate-800 text-xs font-display uppercase tracking-wide">Quadro Geral de Atribuições V2</h3>
            <p className="text-[10px] text-slate-450 mt-0.5">Encontre atribuições de forma cruzada.</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10.5px] text-slate-500 font-semibold">Filtrar Responsável:</span>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="text-xs font-semibold border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50 text-slate-600 focus:border-orange-500"
            >
              <option value="all">Sempre Todos</option>
              <option value="danilo">Ver Danilo (Fundador)</option>
              <option value="sora">Ver Sora (Comercial)</option>
              <option value="risael">Ver Risael (Produção)</option>
              <option value="rulio">Ver Rulio (Marketing)</option>
              <option value="contabilidade">Ver Contabilidade (Fiscal)</option>
            </select>
          </div>
        </div>

        {/* Scroll Contain table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[11px] select-none">
            <thead>
              <tr className="bg-slate-50 text-slate-400 font-extrabold uppercase border-b border-slate-150 tracking-wider">
                <th className="p-3.5 pl-5 font-semibold text-[10px]" style={{ minWidth: '150px' }}>Linha de Produto</th>
                <th className="p-3.5 font-semibold text-[10px] text-slate-700" style={{ minWidth: '160px' }}>Danilo (Fundador)</th>
                <th className="p-3.5 font-semibold text-[10px] text-slate-700" style={{ minWidth: '165px' }}>Sora (Comercial)</th>
                <th className="p-3.5 font-semibold text-[10px] text-slate-700" style={{ minWidth: '165px' }}>Risael (Estúdio/Prod)</th>
                <th className="p-3.5 font-semibold text-[10px] text-slate-700" style={{ minWidth: '150px' }}>Rulio (Marketing)</th>
                <th className="p-3.5 font-semibold text-[10px] text-slate-700" style={{ minWidth: '150px' }}>Contabilidade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {matrixItems.map((item, idx) => {
                const highlightRowClass = item.isFounderGargalo ? 'bg-red-500/1' : '';
                return (
                  <tr key={idx} className={`hover:bg-slate-50/70 transition-colors ${highlightRowClass}`}>
                    {/* Product cell with indicator of founder bottleneck */}
                    <td className="p-3.5 pl-5 font-bold text-slate-805">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate">{item.product}</span>
                        {item.isFounderGargalo && (
                          <span className="w-2 h-2 rounded-full bg-red-400 shadow-xs title-badge shrink-0" title="Dependência alta do Diretor Criativo" />
                        )}
                      </div>
                    </td>

                    {/* Danilo (Founder) Column */}
                    <td className={`p-3.5 ${selectedMember !== 'all' && selectedMember !== 'danilo' ? 'opacity-35' : ''}`}>
                      <div className="p-2 border border-orange-100 bg-orange-500/5 text-orange-900 rounded-xl leading-relaxed">
                        <span className="text-[8.5px] uppercase tracking-wider text-orange-600 block font-bold mb-0.5">LÍDER CRÍTICO</span>
                        {item.danilo}
                      </div>
                    </td>

                    {/* Sora Column */}
                    <td className={`p-3.5 ${selectedMember !== 'all' && selectedMember !== 'sora' ? 'opacity-35' : ''}`}>
                      <div className="p-2 border border-violet-100 bg-violet-500/5 text-violet-900 rounded-xl leading-relaxed">
                        <span className="text-[8.5px] uppercase tracking-wider text-violet-600 block font-bold mb-0.5">GESTÃO OPERANTE</span>
                        {item.sora}
                      </div>
                    </td>

                    {/* Risael Column */}
                    <td className={`p-3.5 ${selectedMember !== 'all' && selectedMember !== 'risael' ? 'opacity-35' : ''}`}>
                      <div className="p-2 border border-indigo-100 bg-indigo-500/5 text-indigo-900 rounded-xl leading-relaxed">
                        <span className="text-[8.5px] uppercase tracking-wider text-indigo-650 block font-bold mb-0.5">TÉCNICO / APOIO</span>
                        {item.risael}
                      </div>
                    </td>

                    {/* Rulio Column */}
                    <td className={`p-3.5 ${selectedMember !== 'all' && selectedMember !== 'rulio' ? 'opacity-35' : ''}`}>
                      <div className="p-2 border border-emerald-100 bg-emerald-500/5 text-emerald-900 rounded-xl leading-relaxed">
                        <span className="text-[8.5px] uppercase tracking-wider text-emerald-650 block font-bold mb-0.5">MÍDIAS / SOCIAis</span>
                        {item.rulio}
                      </div>
                    </td>

                    {/* Contabilidade Column */}
                    <td className={`p-3.5 ${selectedMember !== 'all' && selectedMember !== 'contabilidade' ? 'opacity-35' : ''}`}>
                      <div className="p-2 border border-slate-150 bg-slate-50 text-slate-800 rounded-xl leading-relaxed">
                        <span className="text-[8.5px] uppercase tracking-wider text-slate-500 block font-bold mb-0.5">ASSESSORIA FISCAL</span>
                        {item.contabilidade}
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
