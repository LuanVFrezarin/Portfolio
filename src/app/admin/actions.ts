"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getProjects() {
    if (!process.env.DATABASE_URL) {
        return [];
    }
    try {
        return await db.project.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    } catch (error) {
        console.error("Erro ao buscar projetos:", error);
        return [];
    }
}

export async function createProject(formData: FormData) {
    if (!process.env.DATABASE_URL) {
        return { success: false, error: "DATABASE_URL não configurada." };
    }
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const fullDescription = formData.get("fullDescription") as string;
    const image = formData.get("image") as string;
    const demoUrl = formData.get("demoUrl") as string;
    const githubUrl = formData.get("githubUrl") as string;
    const status = (formData.get("status") as string) || "Completo";
    const technologies = (formData.get("technologies") as string)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    const screenshotsRaw = formData.get("screenshots") as string;
    const screenshots = screenshotsRaw
        ? screenshotsRaw.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

    if (!title || !category || !description || !fullDescription || !image || !technologies.length) {
        return { success: false, error: "Preencha todos os campos obrigatórios." };
    }

    try {
        await db.project.create({
            data: {
                title,
                category,
                description,
                fullDescription,
                image,
                demoUrl: demoUrl || null,
                githubUrl: githubUrl || null,
                technologies,
                screenshots,
                status,
            },
        });

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Erro ao criar projeto:", error);
        return { success: false, error: "Falha ao salvar no banco de dados." };
    }
}

export async function deleteProject(id: number) {
    if (!process.env.DATABASE_URL) {
        return { success: false, error: "DATABASE_URL não configurada." };
    }
    try {
        await db.project.delete({
            where: { id },
        });
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Erro ao deletar projeto:", error);
        return { success: false, error: "Falha ao deletar o projeto." };
    }
}
