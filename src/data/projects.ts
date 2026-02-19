export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  image: string;
  screenshots?: string[];
  demoUrl?: string;
  githubUrl?: string;
  status: string;
}

export const projects: Project[] = [
  {
    id: 1001,
    title: "Racha 2.0 — Divisor de Contas",
    category: "Produtividade",
    description: "Divida contas em tempo real via QR Code com sincronização instantânea entre todos os participantes.",
    fullDescription: "App completo de divisão de contas com sessões via QR Code, sincronização em tempo real usando Socket.io, cálculo automático proporcional entre participantes, histórico de divisões e exportação em PDF. Backend Node.js + Express com frontend React + Vite.",
    technologies: ["React", "Vite", "Node.js", "Express", "Socket.io"],
    image: "/screenshots/racha/racha1.PNG",
    screenshots: ["/screenshots/racha/racha1.PNG", "/screenshots/racha/racha2.PNG", "/screenshots/racha/racha3.PNG"],
    demoUrl: "https://portfolio-racha-q98j.vercel.app/",
    githubUrl: "https://github.com/LuanVFrezarin/portfolio-split-bill",
    status: "Completo"
  },
  {
    id: 1002,
    title: "Ponto Eletrônico",
    category: "Empresarial",
    description: "Sistema completo de controle de ponto com login por PIN, painel admin e gestão de solicitações.",
    fullDescription: "Sistema de ponto eletrônico empresarial com login por PIN, painel administrativo para gestão de funcionários, registro completo de jornada (entrada, almoço, saída), sistema de solicitações de correções e justificativas, pedidos de folga, notificações internas e relatórios gerenciais. Pronto para migração PostgreSQL via Prisma.",
    technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "Prisma ORM"],
    image: "/screenshots/pontoeletronico/ponto1.PNG",
    screenshots: ["/screenshots/pontoeletronico/ponto1.PNG", "/screenshots/pontoeletronico/ponto2.PNG", "/screenshots/pontoeletronico/ponto3.PNG", "/screenshots/pontoeletronico/ponto4.PNG"],
    demoUrl: "https://portifolio-sistema-de-ponto-eletron.vercel.app/",
    githubUrl: "https://github.com/LuanVFrezarin/portf-lio-ponto-eletronico",
    status: "Completo"
  },
  {
    id: 1003,
    title: "Crypto Analytics",
    category: "Dados",
    description: "Dashboard premium de criptomoedas com preços simulados em tempo real e gráficos interativos.",
    fullDescription: "Dashboard de portfólio cripto com atualização de preços a cada 3 segundos, gráfico de evolução do portfólio, pizza de alocação de ativos, lista de criptomoedas com variação 24h, histórico de transações e toggle para esconder saldo. Design dark mode ultra-premium com glassmorphism e gradientes.",
    technologies: ["Next.js 14", "TypeScript", "Recharts", "Tailwind CSS"],
    image: "/screenshots/cryptoanalytics/cryp1.PNG",
    screenshots: ["/screenshots/cryptoanalytics/cryp1.PNG", "/screenshots/cryptoanalytics/cryp2.PNG"],
    demoUrl: "https://cryptoanalytics-portfolio.vercel.app/",
    githubUrl: "https://github.com/LuanVFrezarin/crypto_analytics",
    status: "Completo"
  },
  {
    id: 1004,
    title: "FlowTask — Kanban Manager",
    category: "Produtividade",
    description: "Gerenciador de projetos Kanban com drag-and-drop, múltiplos boards e dashboard de métricas.",
    fullDescription: "Aplicação Kanban completa com múltiplos boards personalizáveis (cores e ícones), drag-and-drop intuitivo entre colunas via @dnd-kit, campos ricos de tarefa (título, descrição, prioridade, prazo, labels), dashboard consolidado com métricas de progresso, animações fluidas com Framer Motion e API REST completa com persistência PostgreSQL via Prisma ORM.",
    technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "@dnd-kit", "Framer Motion"],
    image: "/screenshots/flowtask/flow1.PNG",
    screenshots: ["/screenshots/flowtask/flow1.PNG", "/screenshots/flowtask/flow2.PNG"],
    demoUrl: "https://flow-task-one.vercel.app/",
    githubUrl: "https://github.com/LuanVFrezarin/FlowTask",
    status: "Completo"
  },
  {
    id: 1005,
    title: "Blog Pessoal",
    category: "Web",
    description: "Blog moderno e responsivo com dark mode, busca, categorias, comentários e newsletter.",
    fullDescription: "Plataforma de blog full-featured com Next.js 14, filtros interativos por categoria, barra de busca, sistema de comentários, assinatura de newsletter, botões de compartilhamento social, indicador de progresso de leitura, recomendações de posts relacionados e design responsivo com dark/light mode.",
    technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "Next Themes", "Date-fns"],
    image: "/screenshots/blogpessoal/blog1.PNG",
    screenshots: ["/screenshots/blogpessoal/blog1.PNG", "/screenshots/blogpessoal/blog2.PNG", "/screenshots/blogpessoal/blog3.PNG"],
    demoUrl: "https://portfolio-blog-vercel-aumv.vercel.app",
    githubUrl: "https://github.com/LuanVFrezarin/portfolio-blog",
    status: "Completo"
  },
  {
    id: 1006,
    title: "ContractFlow — Gestão de Contratos",
    category: "Empresarial",
    description: "Painel admin para gestão de clientes, contratos e faturas com dashboard de KPIs e gráficos.",
    fullDescription: "Sistema administrativo CRUD para gestão de clientes, contratos e faturas. Dashboard com KPIs e gráficos interativos via Recharts, gerenciamento completo de clientes/contratos/faturas, notificações, histórico de atividades, relatórios (receita, contratos ativos, faturas pendentes), autenticação via NextAuth, validação com React Hook Form + Zod e persistência PostgreSQL via Prisma.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Recharts", "Zod"],
    image: "/screenshots/contractflow/con1.PNG",
    screenshots: ["/screenshots/contractflow/con1.PNG", "/screenshots/contractflow/con2.PNG", "/screenshots/contractflow/con3.PNG", "/screenshots/contractflow/con4.PNG", "/screenshots/contractflow/con5.PNG", "/screenshots/contractflow/con6.PNG"],
    demoUrl: "https://contractflow-vercel.vercel.app/",
    githubUrl: "https://github.com/LuanVFrezarin/ContractFlow",
    status: "Completo"
  }
];

export const categories = ["Todos", "Produtividade", "Empresarial", "Dados", "Web"];
