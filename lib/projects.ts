import { projects as demoProjects } from "@/data/projects";
import { fetchAllSources, type SyncProject } from "@/lib/sync";

export async function getProjects(): Promise<SyncProject[]> {
  try {
    const live = await fetchAllSources();
    return live.projects.length ? live.projects : demoProjects;
  } catch {
    return demoProjects;
  }
}

export async function getProject(slug: string) {
  const items = await getProjects();
  return items.find((project) => project.slug === slug);
}

export function formatDate(date: string) {
  if (!date) return "TBA";
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return "TBA";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(parsed);
}

export function initials(name: string) { return name.slice(0, 2).toUpperCase(); }
