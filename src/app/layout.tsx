import type { Metadata } from "next"; // Tipo pro Next.js definir metadados da página
import { Geist, Geist_Mono } from "next/font/google"; // Fontes do Google Fonts
import "./globals.css"; // Estilos globais
import { Toaster } from "@/components/ui/toaster"; // Componente pra mostrar notificações

// Carrega a fonte sans-serif
const geistSans = Geist({
  variable: "--font-geist-sans", // Variável CSS pra usar a fonte
  subsets: ["latin"], // Só carrega caracteres latinos
});

// Carrega a fonte monoespaçada
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadados da página pro SEO e redes sociais
export const metadata: Metadata = {
  title: "Luan Frezarin | Portfólio", // Título da aba
  description: "Portfólio profissional de Luan Frezarin, desenvolvedor de aplicações mobile e sistemas online de alta performance.", // Descrição pro Google
  keywords: ["Luan Frezarin", "Mobile Developer", "React Native", "Next.js", "Desenvolvedor de Apps", "Freelancer Tech"], // Palavras-chave
  authors: [{ name: "Luan Frezarin" }], // Autor
  icons: {
    icon: "https://fav.farm/🚀", // Ícone da aba (emoji de foguete)
  },
  openGraph: { // Pro Facebook/LinkedIn
    title: "Luan Frezarin | Portfólio",
    description: "Desenvolvedor em Apps Mobile & Sistemas Online",
    url: "https://luanfrezarin.com",
    siteName: "Luan Portfólio",
    type: "website",
  },
  twitter: { // Pro Twitter
    card: "summary_large_image",
    title: "Luan Frezarin | Portfólio",
    description: "Desenvolvedor Mobile & Sistemas Online",
  },
};

import { ThemeProvider } from "@/components/theme-provider"; // Provedor de tema dark/light
import { Toaster as SonnerToaster } from "@/components/ui/sonner"; // Outro toaster pra notificações

// Layout raiz que envolve todas as páginas
export default function RootLayout({
  children, // Conteúdo das páginas filhas
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning> {/* HTML raiz, em inglês, sem warning de hidratação */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} // Aplica as fontes e antialiasing
      >
        {/* Provedor de tema que permite trocar dark/light */}
        <ThemeProvider
          attribute="class" // Usa classe no HTML
          defaultTheme="dark" // Padrão escuro
          enableSystem // Detecta tema do sistema
          disableTransitionOnChange // Sem transição na mudança
        >
          {children} {/* Renderiza o conteúdo da página */}
          <Toaster /> {/* Notificações shadcn */}
          <SonnerToaster position="top-right" richColors /> {/* Notificações sonner */}
        </ThemeProvider>
      </body>
    </html>
  );
}
