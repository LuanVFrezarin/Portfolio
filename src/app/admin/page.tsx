"use client";

import { useState, useEffect, useCallback } from "react";
import { createProject, deleteProject, getProjects } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Lock, Trash2, ExternalLink, ImageOff, RefreshCw } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type DBProject = {
    id: number;
    title: string;
    category: string;
    image: string;
    status: string;
    demoUrl?: string | null;
    githubUrl?: string | null;
    createdAt: Date;
};

export default function AdminPage() {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [imageError, setImageError] = useState(false);
    const [dbProjects, setDbProjects] = useState<DBProject[]>([]);
    const [loadingProjects, setLoadingProjects] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const ADMIN_PASSWORD = "123456";

    const loadProjects = useCallback(async () => {
        setLoadingProjects(true);
        const projects = await getProjects();
        setDbProjects(projects as DBProject[]);
        setLoadingProjects(false);
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            loadProjects();
        }
    }, [isAuthenticated, loadProjects]);

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            toast.success("Acesso concedido!");
        } else {
            toast.error("Senha incorreta");
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const result = await createProject(formData);

        setLoading(false);

        if (result.success) {
            toast.success("Projeto criado com sucesso!");
            (event.target as HTMLFormElement).reset();
            setImagePreview("");
            setImageError(false);
            loadProjects();
        } else {
            toast.error(result.error || "Algo deu errado");
        }
    }

    async function handleDelete(id: number, title: string) {
        if (!confirm(`Deletar "${title}"? Esta ação não pode ser desfeita.`)) return;
        setDeletingId(id);
        const result = await deleteProject(id);
        setDeletingId(null);
        if (result.success) {
            toast.success(`"${title}" deletado!`);
            loadProjects();
        } else {
            toast.error(result.error || "Falha ao deletar");
        }
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <Card className="w-full max-w-md border-cyan-500/50 bg-black/80 backdrop-blur-xl">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4 border border-cyan-500/50">
                            <Lock className="text-cyan-400" />
                        </div>
                        <CardTitle className="text-white text-2xl font-black">ACESSO RESTRITO</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="pass" className="text-cyan-400">SENHA DO SISTEMA</Label>
                                <Input
                                    id="pass"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-black/50 border-cyan-500/30 text-white focus:border-cyan-400"
                                    placeholder="••••••"
                                />
                            </div>
                            <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold">
                                DESBLOQUEAR
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-2xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Painel Administrativo</h1>
                </div>

                {/* Formulário de cadastro */}
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle>Cadastrar Novo Projeto</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Título do Projeto *</Label>
                                <Input id="title" name="title" placeholder="Ex: Meu App Incrível" required />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="category">Categoria *</Label>
                                    <Select name="category" defaultValue="Produtividade">
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Selecione a categoria" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Produtividade">Produtividade</SelectItem>
                                            <SelectItem value="Empresarial">Empresarial</SelectItem>
                                            <SelectItem value="Dados">Dados</SelectItem>
                                            <SelectItem value="Web">Web</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="status">Status *</Label>
                                    <Select name="status" defaultValue="Completo">
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Selecione o status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Completo">✅ Completo</SelectItem>
                                            <SelectItem value="Em desenvolvimento">🚧 Em desenvolvimento</SelectItem>
                                            <SelectItem value="Pausado">⏸️ Pausado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Descrição Curta (Card) *</Label>
                                <Input id="description" name="description" placeholder="Uma frase rápida sobre o projeto..." required />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="fullDescription">Descrição Completa (Modal) *</Label>
                                <Textarea
                                    id="fullDescription"
                                    name="fullDescription"
                                    placeholder="Explique os detalhes, funcionalidades, desafios do projeto..."
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="technologies">
                                    Tecnologias * <span className="text-muted-foreground font-normal">(separadas por vírgula)</span>
                                </Label>
                                <Input id="technologies" name="technologies" placeholder="React, Next.js, Prisma, TypeScript..." required />
                            </div>

                            {/* Campo de imagem com preview */}
                            <div className="grid gap-2">
                                <Label htmlFor="image">URL da Thumbnail (Screenshot) *</Label>
                                <Input
                                    id="image"
                                    name="image"
                                    placeholder="https://i.imgur.com/... ou https://..."
                                    required
                                    onChange={(e) => {
                                        const val = e.target.value.trim();
                                        setImagePreview(val);
                                        setImageError(false);
                                    }}
                                />
                                {imagePreview && (
                                    <div className="mt-2 rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/30 bg-muted/20">
                                        {imageError ? (
                                            <div className="flex flex-col items-center justify-center gap-2 py-8 text-muted-foreground">
                                                <ImageOff className="w-8 h-8" />
                                                <p className="text-sm">URL inválida ou imagem inacessível</p>
                                            </div>
                                        ) : (
                                            <div className="relative w-full aspect-video">
                                                <Image
                                                    src={imagePreview}
                                                    alt="Preview da thumbnail"
                                                    fill
                                                    className="object-cover"
                                                    onError={() => setImageError(true)}
                                                    unoptimized
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    💡 Cole a URL de uma imagem hospedada (ex:{" "}
                                    <a href="https://imgur.com/upload" target="_blank" rel="noopener noreferrer" className="underline text-cyan-500">
                                        imgur.com
                                    </a>{" "}
                                    — faça upload e use o link direto da imagem).
                                </p>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="screenshots">
                                    URLs de Screenshots <span className="text-muted-foreground font-normal">(separadas por vírgula, opcional)</span>
                                </Label>
                                <Textarea
                                    id="screenshots"
                                    name="screenshots"
                                    placeholder="https://i.imgur.com/foto1.png, https://i.imgur.com/foto2.png, ..."
                                    rows={2}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Fotos que aparecerão no carrossel do card e no modal do projeto.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="demoUrl">URL do Demo <span className="text-muted-foreground font-normal">(opcional)</span></Label>
                                    <Input id="demoUrl" name="demoUrl" placeholder="https://seuprojeto.vercel.app" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="githubUrl">URL do GitHub <span className="text-muted-foreground font-normal">(opcional)</span></Label>
                                    <Input id="githubUrl" name="githubUrl" placeholder="https://github.com/..." />
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Salvando...
                                    </>
                                ) : (
                                    "🚀 Criar Projeto"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Lista de projetos do banco */}
                <Card className="border-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Projetos no Banco ({dbProjects.length})</CardTitle>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={loadProjects}
                            disabled={loadingProjects}
                            title="Atualizar lista"
                        >
                            <RefreshCw className={`w-4 h-4 ${loadingProjects ? "animate-spin" : ""}`} />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {loadingProjects ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                            </div>
                        ) : dbProjects.length === 0 ? (
                            <p className="text-center text-muted-foreground py-8">
                                Nenhum projeto cadastrado no banco ainda.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {dbProjects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors"
                                    >
                                        {/* Thumbnail mini */}
                                        <div className="relative w-14 h-10 rounded overflow-hidden bg-muted shrink-0 border">
                                            {project.image ? (
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = "none";
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                    <ImageOff className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-sm truncate">{project.title}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {project.category} · {project.status}
                                            </p>
                                        </div>

                                        {/* Ações */}
                                        <div className="flex items-center gap-2 shrink-0">
                                            {project.demoUrl && (
                                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" title="Ver demo">
                                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </Button>
                                                </a>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="w-8 h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                onClick={() => handleDelete(project.id, project.title)}
                                                disabled={deletingId === project.id}
                                                title="Deletar projeto"
                                            >
                                                {deletingId === project.id ? (
                                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                ) : (
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
