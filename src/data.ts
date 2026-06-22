/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pillar, Product, ContentCard, CalendarEvent, CommercialLead, FinancialEntry, TeamMember, IpAsset, CreativeApproval } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  // Entretenimento
  {
    id: 'musica',
    name: 'Música',
    pillarId: 'entretenimento',
    objective: 'Lançar singles nas plataformas digitais gravados e masterizados com alta qualidade.',
    channel: 'Spotify, Apple Music, Deezer',
    frequency: 'Mensal',
    responsible: 'Danilo',
    status: 'Ativo',
    revenueType: 'Direta',
    revenueSourceDescription: 'Royalties de streaming e direitos autorais ecad.',
    kpiPrincipal: 'Plays e canais de streaming ativos',
    receitaDireta: 'Royalties Spotify, Apple Music e Deezer',
    receitaIndireta: 'Sincronizações e contratação para shows ao vivo',
    fluxo: ['Composição', 'Gravação', 'Mix/Master', 'Distribuição', 'Lançamento']
  },
  {
    id: 'youtube',
    name: 'YouTube Principal',
    pillarId: 'entretenimento',
    objective: 'Postagens de videoclipes e conteúdos de animação para consolidar audiência infantil/juvenil.',
    channel: 'Canal Batucadan',
    frequency: 'Semanal (Quintas-feiras às 11h)',
    responsible: 'Sora',
    status: 'Ativo',
    revenueType: 'Mista',
    revenueSourceDescription: 'Google AdSense e patrocínios em vídeo.',
    kpiPrincipal: 'Assinantes e receitas de AdSense',
    receitaDireta: 'Google AdSense (Visualizações brasileiras e global)',
    receitaIndireta: 'Patrocínio direto de marcas parceiras',
    fluxo: ['Pauta / Brainstorm', 'Roteiro', 'Gravação', 'Thumbnail e Metadados', 'Publicação', 'Interação']
  },
  {
    id: 'videoclipes',
    name: 'Videoclipes',
    pillarId: 'entretenimento',
    objective: 'Produções visuais completas de músicas autorais com animação ou atuação.',
    channel: 'YouTube & TikTok',
    frequency: 'Bimestral',
    responsible: 'Risael',
    status: 'Ativo',
    revenueType: 'Indireta',
    revenueSourceDescription: 'Fortalecimento da marca e tráfego orgânico para shows.',
    kpiPrincipal: 'Audiência e retenção de vídeo longo',
    receitaDireta: 'YouTube AdSense de vídeos de alta produção',
    receitaIndireta: 'Geração de relevância orgânica que impulsiona shows e livros',
    fluxo: ['Ideia', 'Composição', 'Roteiro', 'Produção', 'Edição', 'Thumbnail', 'Upload', 'Publicado']
  },
  {
    id: 'shorts_kids',
    name: 'Shorts Kids',
    pillarId: 'entretenimento',
    objective: 'Vídeos curtos de teor musical humorístico/pedagógico para captação rápida de inscritos.',
    channel: 'YouTube Shorts, Reels, TikTok',
    frequency: '3x por semana',
    responsible: 'Rulio',
    status: 'Ativo',
    revenueType: 'Indireta',
    revenueSourceDescription: 'Efeito viral que impulsiona os produtos pagos.',
    kpiPrincipal: 'Visualizações e taxa de retenção média',
    receitaDireta: 'AdSense de vídeos curtos',
    receitaIndireta: 'Crescimento viral orgânico que canaliza clientes para shows e cursos',
    fluxo: ['Seleção', 'Edição', 'Legenda', 'Upload', 'Agendamento', 'Publicado']
  },
  {
    id: 'batucartoon',
    name: 'BatuCartoon',
    pillarId: 'entretenimento',
    objective: 'Série de micro-animações com os personagens da marca Batucadan.',
    channel: 'YouTube',
    frequency: 'Mensal',
    responsible: 'Danilo',
    status: 'Em Planejamento',
    revenueType: 'Mista',
    revenueSourceDescription: 'Licenciamento de PI e AdSense.',
    kpiPrincipal: 'Engajamento com personagens próprios',
    receitaDireta: 'AdSense Dedicado do canal',
    receitaIndireta: 'Licenciamento de bonecos, camisetas e livros',
    fluxo: ['Roteiro', 'Dublagem dos Personagens', 'Storyboard', 'Animação Vetorial', 'Sonorização', 'Upload', 'Estreia']
  },
  {
    id: 'descobertas_nilo',
    name: 'Descobertas do Nilo',
    pillarId: 'entretenimento',
    objective: 'Minissérie infantil educativa ensinando rítmica com elementos lúdicos.',
    channel: 'YouTube Kids / Plataforma própria',
    frequency: 'Temporada (10 episódios)',
    responsible: 'Risael',
    status: 'Ativo',
    revenueType: 'Direta',
    revenueSourceDescription: 'Venda de pacotes para escolas e AdSense.',
    kpiPrincipal: 'Visualizações qualificadas nas escolas',
    receitaDireta: 'Venda de licenças anuais para escolas infantis',
    receitaIndireta: 'Ampliação do potencial de shows municipais do Nilo',
    fluxo: ['Grade de Conteúdo', 'Roteirização', 'Produção de Áudio', 'Gravação com Animador', 'Edição', 'Plataforma']
  },
  {
    id: 'compilados',
    name: 'Compilados',
    pillarId: 'entretenimento',
    objective: 'Junções de vídeos de sucesso de 30/60 minutos para retenção de tela de TV.',
    channel: 'YouTube Kids',
    frequency: 'Mensal',
    responsible: 'Sora',
    status: 'Ativo',
    revenueType: 'Direta',
    revenueSourceDescription: 'Retenção longa gerando altos valores de AdSense.',
    kpiPrincipal: 'Minutos assistidos na TV (Retenção)',
    receitaDireta: 'AdSense de vídeo longo (Alto CPM devido à retenção familiar)',
    receitaIndireta: 'Fixação de marca na mente das crianças',
    fluxo: ['Seleção de Sucessos', 'Montagem das Transições', 'Análise de Áudio', 'Renderização Longa', 'Agendamento']
  },
  {
    id: 'shows',
    name: 'Shows',
    pillarId: 'entretenimento',
    objective: 'Apresentação musical ao vivo interativa para prefeituras, festivais e feiras de livro.',
    channel: 'Eventos Presenciais',
    frequency: 'Sob demanda',
    responsible: 'Danilo',
    status: 'Ativo',
    revenueType: 'Direta',
    revenueSourceDescription: 'Cachê de shows públicos ou venda de ingressos.',
    kpiPrincipal: 'Cachê médio por show e ticket geral',
    receitaDireta: 'Cachê pago pelas Secretarias de Cultura ou Prefeituras',
    receitaIndireta: 'Venda física de livros didáticos e camisetas pós-apresentação',
    fluxo: ['Captação do Lead', 'Apresentação da Proposta', 'Contrato Registrado', 'Ficha Técnica / Rider', 'Produção e Viagem', 'Execução', 'Feedbacks / Pós-venda']
  },

  // Formativo
  {
    id: 'palestras',
    name: 'Palestras',
    pillarId: 'formativo',
    objective: 'Sensibilização de educadores, terapeutas e pais com foco no poder da musicalidade.',
    channel: 'Presencial / Grandes Eventos',
    frequency: 'Mensal',
    responsible: 'Danilo',
    status: 'Ativo',
    revenueType: 'Direta',
    revenueSourceDescription: 'Cachê corporativo de palestras e vendas de livros no local.',
    kpiPrincipal: 'Contratações/Leads secundários iniciados na plateia',
    receitaDireta: 'Cachê de palestrante pago por prefeitura ou congresso privado',
    receitaIndireta: 'Venda de assinaturas de cursos online para os ouvintes',
    fluxo: ['Contato da Prefeitura', 'Definição de Tema / Alinhamento', 'Assinatura', 'Execução Audiovisual', 'Venda de Livros no Foyer']
  },
  {
    id: 'formacoes_presenciais',
    name: 'Formações Presenciais',
    pillarId: 'formativo',
    objective: 'Treinamento intensivo prático de professores da rede municipal e estadual.',
    channel: 'Escolas e Auditórios',
    frequency: 'Semestral',
    responsible: 'Sora',
    status: 'Ativo',
    revenueType: 'Direta',
    revenueSourceDescription: 'Contratações via secretarias de educação.',
    kpiPrincipal: 'Professores qualificados e escolas municipais credenciadas',
    receitaDireta: 'Faturamento de pacotes de treinamento em atacado para prefeituras',
    receitaIndireta: 'Credenciamento para aquisição de livros didáticos em massa',
    fluxo: ['Aprovação via Edital / Secretaria', 'Cronograma Pedagógico', 'Preparação de Apostilas', 'Execução Intensiva']
  },
  {
    id: 'cursos_online',
    name: 'Cursos Online',
    pillarId: 'formativo',
    objective: 'Método Batucadan de Educação Musical Aplicada em formato de videoaulas.',
    channel: 'Plataforma Hotmart',
    frequency: 'Lançamentos Trimestrais',
    responsible: 'Rulio',
    status: 'Ativo',
    revenueType: 'Direta',
    revenueSourceDescription: 'Assinaturas ou vendas avulsas de cursos.',
    kpiPrincipal: 'Taxa de conversão de leads e retenção de alunos',
    receitaDireta: 'Venda direta de matrículas individuais (Hotmart/Plataforma)',
    receitaIndireta: 'Conversão em consultores autorizados que propagam a marca',
    fluxo: ['Roteiro do Módulo', 'Gravação de Conteúdo', 'Subida na Área de Membros', 'Criação de Criativos / Campanha', 'Lançamento']
  },
  {
    id: 'conteudo_reflexivo',
    name: 'Conteúdo Reflexivo',
    pillarId: 'formativo',
    objective: 'Artigos e vídeos focados no desenvolvimento infantil, neurociência e ritmo.',
    channel: 'Instagram / LinkedIn / Blog',
    frequency: 'Semanal',
    responsible: 'Danilo',
    status: 'Ativo',
    revenueType: 'Indireta',
    revenueSourceDescription: 'Autoridade e credibilidade, convertendo em palestras.',
    kpiPrincipal: 'Novos seguidores qualificados de educação / Compartilhamentos',
    receitaDireta: 'Inexistente',
    receitaIndireta: 'Geração de autoridade intelectual que influi na venda de shows e palestras',
    fluxo: ['Pauta Técnica', 'Roteiro de Texto', 'Revisão Científica', 'Criação do Card Visual', 'Postagem / Interação']
  },

  // Pedagógico
  {
    id: 'oficinas_musicais',
    name: 'Oficinas Musicais',
    pillarId: 'pedagogico',
    objective: 'Aulas práticas interativas de ritmo e percussão corporal direta para alunos.',
    channel: 'Escolas Públicas/Privadas',
    frequency: 'Semanal',
    responsible: 'Risael',
    status: 'Ativo',
    revenueType: 'Direta',
    revenueSourceDescription: 'Vendas diretas para colégios por pacotes.',
    kpiPrincipal: 'Crianças e alunos atendidos ativamente',
    receitaDireta: 'Taxa mensal ou valor por aluno contratado por escolas privadas',
    receitaIndireta: 'Venda de convites de eventos da escola e kits instrumentais',
    fluxo: ['Fechamento Acadêmico', 'Planejamento Prático', 'Logística de Instrumentos', 'Execução Escolar', 'Relatório Mensal']
  },
  {
    id: 'projetos_escolares',
    name: 'Projetos Escolares',
    pillarId: 'pedagogico',
    objective: 'Projetos anuais temáticos de música e teatro com apresentação de final de ano.',
    channel: 'Instituições de Ensino',
    frequency: 'Contratos anuais',
    responsible: 'Sora',
    status: 'Ativo',
    revenueType: 'Direta',
    revenueSourceDescription: 'Faturamento anual dividido mensalmente por aluno ou escola.',
    kpiPrincipal: 'Número de projetos escolares renovados anualmente',
    receitaDireta: 'Mensalidade de licenciamento de material e acompanhamento pedagógico',
    receitaIndireta: 'Tickets do espetáculo de encerramento do espetáculo musical',
    fluxo: ['Prospecção de Diretoras', 'Apresentação Pedagógica', 'Fechamento de Licenciamento', 'Cronograma Semestral', 'Mostra Final']
  },
  {
    id: 'livros',
    name: 'Livros',
    pillarId: 'pedagogico',
    objective: 'Publicação de livros didáticos ilustrados com QR codes vinculados a canções digitais.',
    channel: 'Editoras / Venda Direta / Amazon',
    frequency: 'Anual',
    responsible: 'Danilo',
    status: 'Ativo',
    revenueType: 'Direta',
    revenueSourceDescription: 'Direitos de publicação e venda de tiragens físicas.',
    kpiPrincipal: 'Quantidade de tiragens físicas vendidas',
    receitaDireta: 'Venda de exemplares diretos / Editoração de material pedagógico',
    receitaIndireta: 'Geração de novos ouvintes orgânicos através de QR Codes',
    fluxo: ['Draft de Escrita', 'Roteiro de Ilustração', 'Ilustrações de Fundo', 'Otimização de Partituras', 'Geração de QRCodes', 'Editoração final']
  },
  {
    id: 'materiais_pedagogicos',
    name: 'Materiais Pedagógicos',
    pillarId: 'pedagogico',
    objective: 'Kits de instrumentos reciclados simplificados e roteiros com guias rítmicos.',
    channel: 'Loja Batucadan / Entregas Físicas',
    frequency: 'Contínuo',
    responsible: 'Rulio',
    status: 'Em Planejamento',
    revenueType: 'Direta',
    revenueSourceDescription: 'E-commerce próprio de produtos pedagógicos de apoio.',
    kpiPrincipal: 'Vendas através da loja oficial',
    receitaDireta: 'Venda de kits de apoio e instrumentos rítmicos integrados',
    receitaIndireta: 'Reforço do branding da metodologia nas salas de aula',
    fluxo: ['Desenho Técnico', 'Protótipo e Teste Rítmico', 'Produção física / Fornecedor', 'Estoque', 'Fulfillment / Envio']
  }
];

export const INITIAL_PILLARS: Pillar[] = [
  {
    id: 'entretenimento',
    name: 'Entretenimento',
    description: 'Nossa frente de grande alcance e impacto de marca. Vídeos, canções divertidas e shows que cativam famílias brasileiras.',
    icon: 'Music',
    products: INITIAL_PRODUCTS.filter(p => p.pillarId === 'entretenimento')
  },
  {
    id: 'formativo',
    name: 'Formativo',
    description: 'Focado em habilitar adultos, capacitores, professores e educadores com a nossa exclusiva metodologia musical intuitiva.',
    icon: 'GraduationCap',
    products: INITIAL_PRODUCTS.filter(p => p.pillarId === 'formativo')
  },
  {
    id: 'pedagogico',
    name: 'Pedagógico',
    description: 'Aplicações didáticas estruturadas diretamente para instituições de ensino, preenchendo grades curriculares com ritmo, percussão corporal e contação de histórias.',
    icon: 'BookOpen',
    products: INITIAL_PRODUCTS.filter(p => p.pillarId === 'pedagogico')
  }
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'danilo',
    name: 'Danilo',
    role: 'Diretor Criativo e Músico',
    responsibilities: [
      'Criação de músicas, personagens e roteiros de animação.',
      'Apresentação de Shows e Palestras.',
      'Revisão e homologação de novos produtos e materiais de IP.',
      'Direção artística geral.'
    ],
    avatar: 'DB',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  {
    id: 'sora',
    name: 'Sora',
    role: 'Gestora Comercial e Conteúdo',
    responsibilities: [
      'Relacionamento com escolas e gestão de parcerias fiscais.',
      'Responsável pelo calendário de lançamentos e posts no YouTube.',
      'Gestão da agenda institucional e de shows.',
      'Validação de propostas comerciais.'
    ],
    avatar: 'SR',
    color: 'bg-amber-100 text-amber-800 border-amber-300'
  },
  {
    id: 'risael',
    name: 'Risael',
    role: 'Produtor e Editor Audiovisual',
    responsibilities: [
      'Gravação de conteúdo e videoclipes em estúdio ou externa.',
      'Edição, finalização de áudio, mixagem/masterização.',
      'Animações curtas e montagem de compilados para o YouTube Kids.',
      'Organização de backup e infraestrutura técnica.'
    ],
    avatar: 'RL',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-300'
  },
  {
    id: 'rulio',
    name: 'Rulio',
    role: 'Social Media e Marketing',
    responsibilities: [
      'Gestão operacional do Instagram, Reels e TikTok.',
      'Edição ágil de Shorts de cortes/humor extraídos.',
      'Criação de legendas descritivas e otimização de SEO para canais.',
      'Suporte operacional no Hotmart e canais de atendimento a alunos.'
    ],
    avatar: 'RU',
    color: 'bg-rose-100 text-rose-800 border-rose-300'
  },
  {
    id: 'contabilidade',
    name: 'Contabilidade',
    role: 'Assessoria Fiscal e Financeira Externa',
    responsibilities: [
      'Fechamento contábil mensal.',
      'Cálculo e emissão do imposto complementar Simples Nacional.',
      'Folha de pró-labore e guias de recolhimento.',
      'Validação de contratos do ponto de vista de faturamento tributário.'
    ],
    avatar: 'CT',
    color: 'bg-slate-100 text-slate-800 border-slate-300'
  }
];

export const INITIAL_CONTENT_CARDS: ContentCard[] = [
  {
    id: 'cc-1',
    productId: 'youtube',
    productName: 'YouTube Principal',
    title: 'Videoclipe: O Samba do Jabuti',
    responsible: 'Risael',
    deadline: '2026-06-25',
    channel: 'YouTube',
    fileLink: 'https://drive.google.com/drive/u/1/folders/sam-jabuti',
    stage: 'Em edição',
    notes: 'Ajustando as cores das folhas de fundo e o sincronismo dos golpes rítmicos.',
    priority: 'Alta'
  },
  {
    id: 'cc-2',
    productId: 'musica',
    productName: 'Música',
    title: 'Single: Ritmo do Coração (Áudio Principal)',
    responsible: 'Danilo',
    deadline: '2026-06-30',
    channel: 'Spotify/Apple',
    fileLink: 'https://drive.google.com/drive/u/1/folders/audio-final',
    stage: 'Em revisão Danilo',
    notes: 'Preciso escutar no fone de referência e no som do carro antes de mandar para a distribuidora.',
    priority: 'Alta'
  },
  {
    id: 'cc-3',
    productId: 'shorts_kids',
    productName: 'Shorts Kids',
    title: 'Desafio rítmico: Bate Palma e Bate Pé',
    responsible: 'Rulio',
    deadline: '2026-06-22',
    channel: 'Reels / TikTok',
    fileLink: 'https://tiktok.com/draft/desafio-palpe',
    stage: 'Agendado',
    notes: 'Programado para segunda às 12h. Coprodução no feed marcada com o Danilo.',
    priority: 'Média'
  },
  {
    id: 'cc-4',
    productId: 'descobertas_nilo',
    productName: 'Descobertas do Nilo',
    title: 'Episódio 4: O Som dos Metais na Natureza',
    responsible: 'Risael',
    deadline: '2026-07-05',
    channel: 'YouTube Kid',
    fileLink: 'https://drive.google.com/f/ep4-metais',
    stage: 'Em produção',
    notes: 'Cenas de captação externa no sítio agendadas para quarta-feira.',
    priority: 'Média'
  },
  {
    id: 'cc-5',
    productId: 'conteudo_reflexivo',
    productName: 'Conteúdo Reflexivo',
    title: 'Artigo: Como o Ritmo ajuda na Alfabetização de Crianças com TDAH',
    responsible: 'Danilo',
    deadline: '2026-06-28',
    channel: 'LinkedIn',
    fileLink: '',
    stage: 'Roteiro',
    notes: 'Estruturando a base científica com o artigo da USP que recebi da Sora.',
    priority: 'Baixa'
  },
  {
    id: 'cc-6',
    productId: 'batucartoon',
    productName: 'BatuCartoon',
    title: 'Roteiro de Animação: A Corrida das Baquetas',
    responsible: 'Danilo',
    deadline: '2026-07-15',
    channel: 'YouTube',
    fileLink: '',
    stage: 'Ideia',
    notes: 'Inspirado em contação antiga. Pensando no design dos novos bonequinhos.',
    priority: 'Média'
  },
  {
    id: 'cc-7',
    productId: 'compilados',
    productName: 'Compilados',
    title: 'Compilado Infantil de 1 Hora: Ritmo e Contação de Histórias',
    responsible: 'Sora',
    deadline: '2026-06-20',
    channel: 'YouTube Kids',
    fileLink: 'https://youtube.com/watch?v=comp-ritmo',
    stage: 'Publicado',
    notes: 'Publicado na quinta. Rápida aceitação com excelente retenção.',
    priority: 'Alta'
  },
  {
    id: 'cc-8',
    productId: 'cursos_online',
    productName: 'Cursos Online',
    title: 'Módulo 3: Musicalização em Sala de Aula com Objetos do Cotidiano',
    responsible: 'Rulio',
    deadline: '2026-06-24',
    channel: 'Hotmart',
    fileLink: 'https://hotmart.com/manage/modulo3',
    stage: 'Pronto',
    notes: 'Edição final concluída, legenda e material de apoio em PDF anexado.',
    priority: 'Alta'
  }
];

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'ev-1',
    title: 'Publicação: Compilado 1 hora',
    date: '2026-06-20',
    type: 'postagem',
    responsible: 'Sora',
    description: 'Postado no YouTube Kids às 11:00 am.',
    time: '11:00'
  },
  {
    id: 'ev-2',
    title: 'Lançamento single "Ritmo do Coração"',
    date: '2026-06-30',
    type: 'lancamento',
    responsible: 'Danilo',
    description: 'Pré-salve ativo nas plataformas de música.',
    time: '00:00'
  },
  {
    id: 'ev-3',
    title: 'Show: Festa Junina Municipal Santo André',
    date: '2026-06-24',
    type: 'show',
    responsible: 'Danilo',
    description: 'Cachê fechado pela Secretaria de Cultura. Palco Principal.',
    time: '16:00'
  },
  {
    id: 'ev-4',
    title: 'Oficina Rítmica Infantil - Colégio Oswald',
    date: '2026-06-23',
    type: 'oficina',
    responsible: 'Risael',
    description: 'Oficina prática para 3 turmas de Educação Infantil.',
    time: '09:00'
  },
  {
    id: 'ev-5',
    title: 'Show: Virada Cultural do Interior (Campinas)',
    date: '2026-06-28',
    type: 'show',
    responsible: 'Danilo',
    description: 'Palco Kids, apresentação interativa.',
    time: '14:30'
  },
  {
    id: 'ev-6',
    title: 'Reunião de Alinhamento Batucadan',
    date: '2026-06-22',
    type: 'reuniao',
    responsible: 'Sora',
    description: 'Revisão de metas de vendas de livros com distribuidora.',
    time: '10:00'
  },
  {
    id: 'ev-7',
    title: 'Entrega de Notas Fiscais - Contabilidade',
    date: '2026-06-29',
    type: 'prazo',
    responsible: 'Contabilidade',
    description: 'Prazo limite do mês para envio dos comprovantes e NFs para fechamento fiscal.',
    time: '18:00'
  },
  {
    id: 'ev-8',
    title: 'Oficina Prática - Escola Pupi Jundiaí',
    date: '2026-07-03',
    type: 'oficina',
    responsible: 'Sora',
    description: 'Atividade lúdica integrada com os kits rítmicos Batucadan.',
    time: '14:00'
  },
  {
    id: 'ev-9',
    title: 'Reunião: Projeto Escola de Osasco',
    date: '2026-06-26',
    type: 'reuniao',
    responsible: 'Sora',
    description: 'Apresentação de proposta de formação continuada para Secretário Adjunto.',
    time: '15:00'
  }
];

export const INITIAL_COMMERCIAL_LEADS: CommercialLead[] = [
  {
    id: 'com-1',
    client: 'Secretaria de Cultura de Guarulhos',
    type: 'show',
    estimatedValue: 18000,
    responsible: 'Sora',
    nextAction: 'Enviar certidões negativas restantes atualizadas.',
    deadline: '2026-06-23',
    status: 'Negociação',
    phone: '(11) 98765-4321',
    email: 'cultura@guarulhos.sp.gov.br',
    notes: 'Cachê pré-aprovado para a Semana da Infância de Outubro.'
  },
  {
    id: 'com-2',
    client: 'Colégio Santa Cruz',
    type: 'projeto escolar',
    estimatedValue: 35000,
    responsible: 'Sora',
    nextAction: 'Ligar para marcar reunião presencial com conselho pedagógico.',
    deadline: '2026-06-25',
    status: 'Primeiro contato',
    phone: '(11) 3024-5000',
    email: 'diretoria@santacruz.g12.br',
    notes: 'Interessados no projeto anual de musicalização infantil.'
  },
  {
    id: 'com-3',
    client: 'Prefeitura de São José dos Campos',
    type: 'palestra',
    estimatedValue: 12500,
    responsible: 'Danilo',
    nextAction: 'Aguardar assinatura do empenho e publicação no Diário Oficial.',
    deadline: '2026-06-29',
    status: 'Fechado',
    phone: '(12) 3946-2000',
    email: 'educacao@sjc.sp.gov.br',
    notes: 'Palestra de Abertura do Semestre para 800 professores de Ensino Infantil.'
  },
  {
    id: 'com-4',
    client: 'Sesc Ribeirão Preto',
    type: 'oficina',
    estimatedValue: 6000,
    responsible: 'Risael',
    nextAction: 'Escrever proposta detalhada de oficina de percussão corporal.',
    deadline: '2026-06-24',
    status: 'Proposta enviada',
    phone: '(16) 3977-4400',
    email: 'teatrinho@ribeirao.sescsp.org.br',
    notes: 'Evento previsto para o final de semana de férias de Julho.'
  },
  {
    id: 'com-5',
    client: 'Colégio Visconde de Porto Seguro',
    type: 'projeto escolar',
    estimatedValue: 45000,
    responsible: 'Sora',
    nextAction: 'Fazer follow-up via e-mail da proposta de expansão pedagógica.',
    deadline: '2026-06-26',
    status: 'Negociação',
    phone: '(11) 3744-2000',
    email: 'compras@portoseguro.org.br',
    notes: 'A proposta inclui o fornecimento de 300 livros para doações/turma.'
  },
  {
    id: 'com-6',
    client: 'Prefeitura de Bragança Paulista (Virada)',
    type: 'show',
    estimatedValue: 15000,
    responsible: 'Danilo',
    nextAction: 'Cadastrar no portal de licitação até sexta-feira.',
    deadline: '2026-06-22',
    status: 'Lead',
    phone: '',
    email: 'turismo@braganca.sp.gov.br',
    notes: 'Identificação de edital aberto para contratação de espetáculos infantis.'
  },
  {
    id: 'com-7',
    client: 'Colégio Maple Bear Sorocaba',
    type: 'oficina',
    estimatedValue: 8000,
    responsible: 'Rulio',
    nextAction: 'Arquivar oportunidade por indisponibilidade de data na agenda.',
    deadline: '2026-06-15',
    status: 'Perdido',
    phone: '(15) 3033-9100',
    email: 'sorocaba@maplebear.com',
    notes: 'Eles queriam especificamente para 19 de Junho, data na qual já tínhamos outro show contratado.'
  }
];

export const INITIAL_FINANCIAL_ENTRIES: FinancialEntry[] = [
  {
    id: 'fin-1',
    title: 'Cachê Show: Virada Campinas',
    type: 'receita',
    category: 'Show',
    value: 14500,
    date: '2026-06-28',
    invoiceStatus: 'Emitida',
    paymentStatus: 'Pendente',
    responsible: 'Sora',
    notes: 'Pagamento programado para 10 dias úteis após apresentação.'
  },
  {
    id: 'fin-2',
    title: 'Contrato Mensal: Escola Pupi (Formativo)',
    type: 'receita',
    category: 'Curso',
    value: 8600,
    date: '2026-06-10',
    invoiceStatus: 'Emitida',
    paymentStatus: 'Pago',
    responsible: 'Sora',
    notes: 'Mensalidade recorrente do projeto de assessoramento continuado.'
  },
  {
    id: 'fin-3',
    title: 'AdSense YouTube - Maio/2026',
    type: 'receita',
    category: 'AdSense-YouTube',
    value: 12400,
    date: '2026-06-21',
    invoiceStatus: 'Não Aplicável',
    paymentStatus: 'Pago',
    responsible: 'Contabilidade',
    notes: 'Recebimento internacional direto via banco de câmbio.'
  },
  {
    id: 'fin-4',
    title: 'Cachê Prefeitura: Santo André (Festa Junina)',
    type: 'receita',
    category: 'Show',
    value: 16000,
    date: '2026-06-24',
    invoiceStatus: 'Emitida',
    paymentStatus: 'Pendente',
    responsible: 'Sora',
    notes: 'Nota empenhada. Pagamento via transferência bancária direta.'
  },
  {
    id: 'fin-5',
    title: 'Venda de Livros Digitais / Hotmart',
    type: 'receita',
    category: 'Livros-Materiais',
    value: 4800,
    date: '2026-06-15',
    invoiceStatus: 'Emitida',
    paymentStatus: 'Pago',
    responsible: 'Rulio',
    notes: 'Consolidação de transações automáticas de venda do e-book.'
  },
  // Despesas
  {
    id: 'fin-6',
    title: 'Honorários: Contabilidade Mensal',
    type: 'despesa',
    category: 'Administrativo',
    value: 1200,
    date: '2026-06-05',
    invoiceStatus: 'Emitida',
    paymentStatus: 'Pago',
    responsible: 'Contabilidade',
    notes: 'Taxa fixa referente à assessoria fiscal e emissão tributária.'
  },
  {
    id: 'fin-7',
    title: 'Simples Nacional - Guia DAS (Ref. Maio)',
    type: 'despesa',
    category: 'Impostos',
    value: 3200,
    date: '2026-06-20',
    invoiceStatus: 'Não Aplicável',
    paymentStatus: 'Pago',
    responsible: 'Contabilidade',
    notes: 'Imposto do Simples unificado sobre faturamento de serviços do mês anterior.'
  },
  {
    id: 'fin-8',
    title: 'Aquisição de microfones e cabos de estúdio',
    type: 'despesa',
    category: 'Produção-Edição',
    value: 2900,
    date: '2026-06-12',
    invoiceStatus: 'Emitida',
    paymentStatus: 'Pago',
    responsible: 'Risael',
    notes: 'Compra de 2 Shure SM58 e fiação XLR para gravação de podcasts.'
  },
  {
    id: 'fin-9',
    title: 'Campanha de Tráfego Pago - Matrículas Cursos',
    type: 'despesa',
    category: 'Marketing',
    value: 1800,
    date: '2026-06-18',
    invoiceStatus: 'Emitida',
    paymentStatus: 'Pago',
    responsible: 'Rulio',
    notes: 'Anúncios direcionados para o Instagram com foco em educadores.'
  },
  {
    id: 'fin-10',
    title: 'Remuneração Mensal: Risael (Produção)',
    type: 'despesa',
    category: 'Funcionários-Equipe',
    value: 5500,
    date: '2026-06-30',
    invoiceStatus: 'Pendente',
    paymentStatus: 'Pendente',
    responsible: 'Sora',
    notes: 'Transferência programada mensal prestação de serviços.'
  },
  {
    id: 'fin-11',
    title: 'Remuneração Mensal: Rulio (Marketing)',
    type: 'despesa',
    category: 'Funcionários-Equipe',
    value: 4000,
    date: '2026-06-30',
    invoiceStatus: 'Pendente',
    paymentStatus: 'Pendente',
    responsible: 'Sora',
    notes: 'Transferência programada mensal prestação de serviços.'
  },
  {
    id: 'fin-12',
    title: 'Estúdio de Gravação - Aluguel Adicional',
    type: 'despesa',
    category: 'Produção-Edição',
    value: 1500,
    date: '2026-06-14',
    invoiceStatus: 'Emitida',
    paymentStatus: 'Pago',
    responsible: 'Danilo',
    notes: 'Locação complementar de estúdio de percussão acústica para novos singles.'
  }
];

export const INITIAL_IP_ASSETS: IpAsset[] = [
  {
    id: 'ip-1',
    name: 'Marca Batucadan',
    category: 'Marca',
    quantity: 'Registro INPI Classe 41 e 28',
    status: 'Ativo e Registrado',
    responsible: 'Sora',
    monetizationPotential: 'Altíssimo',
    description: 'Identidade visual, logotipo, fontes e marca nominativa registrada nacionalmente no INPI.',
    estimatedValue: 'R$ 850.000'
  },
  {
    id: 'ip-2',
    name: 'Personagens Batucadan (Nilo, Juju, Caio, Kika e Roco)',
    category: 'Personagem',
    quantity: 5,
    status: 'Ativo e Registrado',
    responsible: 'Danilo',
    monetizationPotential: 'Altíssimo',
    description: 'Desenhos dos personagens principais com diretrizes de estilo vetorial registrados na Biblioteca Nacional.',
    estimatedValue: 'R$ 450.000'
  },
  {
    id: 'ip-3',
    name: 'Músicas Autorais',
    category: 'Música',
    quantity: 38,
    status: 'Ativo e Registrado',
    responsible: 'Danilo',
    monetizationPotential: 'Alto',
    description: 'Canções infantis e pedagógicas registradas na Abramus / ECAD para arrecadação de royalties.',
    estimatedValue: 'R$ 320.000 YTD'
  },
  {
    id: 'ip-4',
    name: 'Coleção Ritmos da Terra (Livros Didáticos)',
    category: 'Livro',
    quantity: 3,
    status: 'Ativo e Registrado',
    responsible: 'Danilo',
    monetizationPotential: 'Alto',
    description: 'Livros físicos com QR Code integrados ensinando coordenação musical básica.',
    estimatedValue: 'R$ 180.000'
  },
  {
    id: 'ip-5',
    name: 'Metodologia Educar pelo Brincar',
    category: 'Metodologia',
    quantity: 'Método Principal',
    status: 'Ativo e Registrado',
    responsible: 'Danilo',
    monetizationPotential: 'Altíssimo',
    description: 'Propriedade intelectual de ensino rítmico corporal certificado e homologado em escolas.',
    estimatedValue: 'R$ 600.000'
  },
  {
    id: 'ip-6',
    name: 'Séries Animadas (BatuCartoon e Descobertas do Nilo)',
    category: 'Série Animada',
    quantity: 2,
    status: 'Em Criação',
    responsible: 'Risael',
    monetizationPotential: 'Altíssimo',
    description: 'Episódios roteirizados e em etapa de animação para negociação com plataformas de streaming.',
    estimatedValue: 'R$ 350.000'
  }
];

export const INITIAL_CREATIVE_APPROVALS: CreativeApproval[] = [
  {
    id: 'ap-1',
    title: 'Roteiro BatuCartoon Episódio 3: Nilo e o Samba-Enredo',
    type: 'Roteiro',
    productName: 'BatuCartoon',
    requestedBy: 'Danilo',
    date: '2026-06-20',
    status: 'Pendente',
    notes: 'Roteiro completo de 3 minutos focando na rítmica do agogô para aprovação.',
    contentReference: 'Nilo encontra um pandeiro gigante e aprende a marcar o tempo forte do samba com o mestre agogô.'
  },
  {
    id: 'ap-2',
    title: 'Mixagem Final do Single: O Som do Olodum',
    type: 'Música',
    productName: 'Música',
    requestedBy: 'Risael',
    date: '2026-06-21',
    status: 'Pendente',
    notes: 'Faixa estéreo final com percussão da Bahia masterizada e pronta para subir nas plataformas.',
    contentReference: 'Arquivo de áudio masterizado a -14 LUF; grave potente percussivo equilibrado.'
  },
  {
    id: 'ap-3',
    title: 'Estilo do Boneco de Pelúcia Nilo (Licenciamento)',
    type: 'Arte/Animação',
    productName: 'BatuCartoon',
    requestedBy: 'Sora',
    date: '2026-06-18',
    status: 'Pendente',
    notes: 'Protótipo em modelo 3D enviado pelo fabricante parceiro.',
    contentReference: 'Pelúcia hipoalergênica de 25cm com guizo de chocalho interno na barriguinha.'
  },
  {
    id: 'ap-4',
    title: 'Proposta Comercial Especial: Circuito Sesc SP',
    type: 'Proposta Comercial',
    productName: 'Shows',
    requestedBy: 'Sora',
    date: '2026-06-19',
    status: 'Pendente',
    notes: 'Cronograma sugerido de 12 apresentações teatrais-musicais lúdicas.',
    contentReference: 'Cachê total de R$ 98.000 limpos com transporte e alimentação inclusos.'
  },
  {
    id: 'ap-5',
    title: 'Criação de Aplicativo "Batucadan Play"',
    type: 'Novo Produto',
    productName: 'Materiais Pedagógicos',
    requestedBy: 'Danilo',
    date: '2026-06-21',
    status: 'Pendente',
    notes: 'Proposta de aplicativo mobile com jogos de percussão virtual e rítmica base.',
    contentReference: 'Jogabilidade interativa onde crianças batem palmas sincronizadas com o microfone.'
  },
  {
    id: 'ap-6',
    title: 'Roteiro Shorts Kids: Piada do Triângulo Triste',
    type: 'Roteiro',
    productName: 'Shorts Kids',
    requestedBy: 'Rulio',
    date: '2026-06-22',
    status: 'Pendente',
    notes: 'Cortezinho humorístico rápido para Reels sobre o triângulo acústico que queria ser bateria.',
    contentReference: 'Rulo contracena com um triângulo falante com vozes engraçadas de pitch alto.'
  }
];
