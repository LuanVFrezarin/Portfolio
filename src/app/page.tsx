import { Header } from "@/components/portfolio/Header"; // Importa o cabeçalho do portfólio
import { CursorEffect } from "@/components/portfolio/CursorEffect"; // Importa o efeito do cursor personalizado
import { Footer } from "@/components/portfolio/Footer"; // Importa o rodapé
import { HomeContent } from "@/components/portfolio/HomeContent"; // Importa o conteúdo principal da página inicial
import { getProjects } from "./admin/actions"; // Importa função pra pegar projetos do banco
import { projects as staticProjects } from "@/data/projects"; // Importa projetos estáticos

export default async function Home() {
  // Busca projetos do banco de dados (IDs 1-999)
  const dbProjects = await getProjects();

  // Projetos do banco ficam primeiro (mais recentes no topo), depois os estáticos (IDs 1001+)
  // Não há risco de colisão de IDs: banco usa autoincrement (1, 2, 3...), estáticos usam 1001+
  // Converte null → undefined pra alinhar com o tipo Project (demoUrl?: string)
  const allProjects = [
    ...dbProjects.map((p) => ({
      ...p,
      demoUrl: p.demoUrl ?? undefined,
      githubUrl: p.githubUrl ?? undefined,
    })),
    ...staticProjects,
  ];

  // Gera categorias dinamicamente a partir de todos os projetos (banco + estáticos)
  const projectCategories = Array.from(new Set(allProjects.map((p) => p.category)));
  const categories = ["Todos", ...projectCategories];

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Efeito do cursor que segue o mouse */}
      <CursorEffect />

      {/* Efeito de scanlines estilo retro */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,255,0.06)_1px,transparent_1px)] bg-[size:4px_100%]" />
      </div>

      {/* Cabeçalho com navegação */}
      <Header />

      {/* Conteúdo principal: hero, sobre mim, projetos */}
      <HomeContent initialProjects={allProjects} categories={categories} />

      {/* Rodapé */}
      <Footer />
    </div>
  );
}
