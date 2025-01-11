import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { db } from "./db-config";
import { Post } from "@/lib/types";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  images: jsonb("images").default([]).notNull(),
});

export const getAllPosts = async (): Promise<Post[]> => {
  const data = (
    await db.select().from(posts).orderBy(posts.createdAt)
  ).reverse();
  return data.map((post) => ({
    ...post,
    images: Array.isArray(post.images) ? post.images : [],
  }));
};

export const createPost = async (
  title: string,
  subject: string,
  body: string,
  images: string[]
) => {
  const result = await db
    .insert(posts)
    .values({ title, subject, body, images })
    .returning();
  return result;
};

export const updatePost = async (id: number, data: Partial<Post>) => {
  const result = await db
    .update(posts)
    .set(data)
    .where(sql`${posts.id} = ${id}`)
    .returning();
  return result;
};

export const deletePost = async (id: number) => {
  const result = await db
    .delete(posts)
    .where(sql`${posts.id} = ${id}`)
    .returning();
  return result;
};
