# Luan Frezarin — Portfolio

Portfólio pessoal desenvolvido com **Next.js 16**, **React 19**, **TypeScript** e **Tailwind CSS 4**. Design dark mode cyberpunk com animações avançadas, efeito de scroll com GSAP e interface 100% responsiva.

**[Ver ao vivo](https://portfolio-luan-frezarin.vercel.app)**

---

## Tecnologias

| Frontend       | Animações          | Backend        | Infra  |
| -------------- | ------------------ | -------------- | ------ |
| Next.js 16     | Framer Motion      | Prisma ORM     | Vercel |
| React 19       | GSAP ScrollTrigger | PostgreSQL     | Sharp  |
| TypeScript 5   | CSS Animations     | Server Actions | —      |
| Tailwind CSS 4 | —                  | —              | —      |
| shadcn/ui      | —                  | —              | —      |

## Funcionalidades

- **Efeito Falling Page** — Transição de scroll com rotação via GSAP ScrollTrigger
- **Projeto Destaque** — Seção dedicada ao app "E Hoje - BORA?" com carrossel de screenshots, stack técnica e timeline de desenvolvimento
- **Carrossel nos Cards** — Screenshots reais ciclando automaticamente em cada projeto
- **Modal Interativo** — Galeria de screenshots com navegação, descrição completa e links
- **Filtro por Categoria** — Produtividade, Empresarial, Dados, Web
- **Seção Sobre Mim** — Bio profissional, foto, habilidades técnicas e diferenciais
- **Painel Admin** — CRUD de projetos protegido por senha com persistência em PostgreSQL
- **Efeitos Visuais** — Glitch text, scanlines, partículas, cursor customizado, glassmorphism

## Projetos no Portfólio

| Projeto              | Stack                                            | Descrição                                                                         |
| -------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------- |
| **E Hoje - BORA?**   | React Native, Node.js, PostgreSQL, Redis, AWS S3 | App mobile publicado na Play Store e App Store — rede social para descobrir bares |
| **Racha 2.0**        | React, Vite, Node.js, Express, Socket.io         | Divisor de contas em tempo real via QR Code                                       |
| **Ponto Eletrônico** | Next.js 14, TypeScript, Tailwind, Prisma         | Sistema completo de controle de ponto empresarial                                 |
| **Crypto Analytics** | Next.js 14, TypeScript, Recharts                 | Dashboard premium de criptomoedas com dados em tempo real                         |
| **FlowTask**         | Next.js 14, Prisma, PostgreSQL, @dnd-kit         | Kanban com drag-and-drop e múltiplos boards                                       |
| **Blog Pessoal**     | Next.js 14, TypeScript, Next Themes              | Blog com dark mode, busca, categorias e newsletter                                |
| **ContractFlow**     | Next.js, Prisma, PostgreSQL, NextAuth, Recharts  | Gestão de contratos com dashboard de KPIs                                         |

## Rodar Localmente

```bash
# Clonar o repositório
git clone https://github.com/LuanVFrezarin/Portfolio.git
cd Portfolio

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

O portfólio funciona sem banco de dados — os projetos são carregados estaticamente. Para habilitar o painel admin com CRUD, configure `DATABASE_URL` no `.env`.

## Estrutura

```
src/
├── app/
│   ├── page.tsx              # Página principal (Server Component)
│   ├── admin/                # Painel administrativo
│   └── globals.css           # Estilos globais + efeitos
├── components/portfolio/
│   ├── HomeContent.tsx        # Conteúdo principal + GSAP falling effect
│   ├── FeaturedProject.tsx    # Projeto destaque (E Hoje)
│   ├── ProjectCard.tsx        # Card com carrossel de screenshots
│   ├── ProjectModal.tsx       # Modal com galeria de fotos
│   ├── Header.tsx             # Navegação fixa
│   └── Footer.tsx             # Rodapé
├── data/
│   └── projects.ts            # Projetos estáticos + screenshots
└── lib/
    └── db.ts                  # Prisma client (lazy loading)
```

## Contato

- **Email:** luan.v.frezarin@gmail.com
- **LinkedIn:** [linkedin.com/in/luan-frezarin](https://www.linkedin.com/in/luan-frezarin-6a4058359/)
- **GitHub:** [github.com/LuanVFrezarin](https://github.com/LuanVFrezarin)

---

Desenvolvido por **Luan Frezarin** — Full Stack Developer
