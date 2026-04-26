import type { BlogEntry, ProjectEntry } from "./content";

export const getBlogPathName = ({ slug }: BlogEntry) => {
  return `/blog/${slug}`;
};

export const getProjectPathName = ({ slug }: ProjectEntry) => {
  return `/projects/${slug}`;
}