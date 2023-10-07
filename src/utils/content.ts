import { type CollectionEntry, getCollection } from "astro:content";

export type ProjectEntry = CollectionEntry<"project">;
export type ProjectEntries = ProjectEntry[];

// Return the project entries sorted by date, newest first
export const getProjectCollection = async (): Promise<ProjectEntries> => {
  const projectEntries = await getCollection("project");
  projectEntries.sort((a, b) => b.data.createdDate.valueOf() - a.data.createdDate.valueOf());
  return projectEntries;
};
