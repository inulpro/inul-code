"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { Templates } from "@/lib/generated/prisma";
import { currentUser } from "@/features/auth/actions";

export const createPlayground = async (data: {
  title: string;
  template: Templates;
  description?: string;
}) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  const { template, title, description } = data;

  try {
    const playground = await db.playground.create({
      data: {
        title,
        description,
        template,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard");
    return playground;
  } catch (error) {
    console.error("Error creating playground:", error);
    return null;
  }
};

export const getAllPlaygroundForUser = async () => {
  const user = await currentUser();

  if (!user?.id) {
    return [];
  }

  try {
    const playgrounds = await db.playground.findMany({
      where: {
        userId: user.id,
      },
      include: {
        user: true,
        starmark: {
          where: {
            userId: user.id,
          },
          select: {
            isMarked: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return playgrounds;
  } catch (error) {
    console.error("Error fetching playgrounds:", error);
    return [];
  }
};

export const deleteProjectById = async (id: string) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  try {
    // Verify ownership before deletion
    const playground = await db.playground.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!playground) {
      throw new Error("Playground not found or access denied");
    }

    await db.playground.delete({
      where: { id },
    });

    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Error deleting playground:", error);
    throw error;
  }
};

export const editProjectById = async (
  id: string,
  data: { title: string; description: string }
) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  try {
    // Verify ownership before update
    const playground = await db.playground.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!playground) {
      throw new Error("Playground not found or access denied");
    }

    await db.playground.update({
      where: { id },
      data,
    });

    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Error updating playground:", error);
    throw error;
  }
};

export const duplicateProjectById = async (id: string) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  try {
    // Verify ownership before duplication
    const originalPlayground = await db.playground.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!originalPlayground) {
      throw new Error("Playground not found or access denied");
    }

    const duplicatedPlayground = await db.playground.create({
      data: {
        title: `${originalPlayground.title} (Copy)`,
        description: originalPlayground.description,
        template: originalPlayground.template,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard");
    return duplicatedPlayground;
  } catch (error) {
    console.error("Error duplicating playground:", error);
    return null;
  }
};
