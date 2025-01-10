import { type CollectionEntry, getCollection } from "astro:content";

export type ProjectEntry = CollectionEntry<"project">;
export type ProjectEntries = ProjectEntry[];

export type BlogEntry = CollectionEntry<"blog">;
export type BlogEntries = BlogEntry[];

export type BookmarkEntry = CollectionEntry<"bookmark">;
export type BookmarkEntries = BookmarkEntry[];

export type NicewordsEntry = CollectionEntry<"nicewords">;
export type NicewordsEntries = NicewordsEntry[];


// Return the project entries sorted by date, newest first
export const getProjectCollection = async (): Promise<ProjectEntries> => {
  const projectEntries = await getCollection("project");
  projectEntries.sort((a, b) => b.data.createdDate.valueOf() - a.data.createdDate.valueOf());
  return projectEntries;
};

export const getBlogCollection = async (): Promise<BlogEntries> => {
    const blogEntries = await getCollection("blog");
    blogEntries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
    return blogEntries;
};

export const getBookMarkCollection = async (): Promise<BookmarkEntries> => {
  const bookmarkEntries = await getCollection("bookmark");
  return bookmarkEntries;
};

export const getNicewordsCollection = async (): Promise<NicewordsEntries> => {
  const nicewordsEntries = await getCollection("nicewords");
  return nicewordsEntries;
};
