import { notFound } from "next/navigation";
import { getProjects, formatDate, getProject, initials } from "@/lib/projects";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{slug:string}> }) {
  const p = await getProject((await params).slug);
  return { title: p ? `${p.name} Airdrop` : "Project" };
}

export default async function ProjectPage({ params }: { params: Promise<{slug:string}> }) {
  const p = await getProject((await params).slug);
  if (!p) notFound();
  return <main className="page container project-page"><Link href="/airdrops" className="back-link">← All drops</Link><div className="project-hero"><div className="big-project-icon">{p.logo ? <img src={p.logo} alt="" /> : initials(p.name)}</div><div><div className="section-kicker">{p.chain.toUpperCase()}</div><h1>{p.name}</h1><p>{p.description}</p></div><span className={`status-pill ${p.status.toLowerCase()}`}>{p.status}</span></div><div className="metrics-grid"><div><span>EVENT</span><b>{p.event}</b></div><div><span>DATE</span><b>{formatDate(p.date)}</b></div><div><span>BLOCKCHAIN</span><b>{p.chain}</b></div><div><span>FUNDING</span><b>{p.funding || "—"}</b></div></div><section className="article-card"><div className="section-kicker">DROP DETAILS</div><h2>About {p.name}</h2><p>{p.description} Droply combines live listings from public data sources and keeps the source attribution visible so dates and statuses can be checked as they change.</p><div className="source-actions">{p.claimUrl && <a href={p.claimUrl} target="_blank" rel="noreferrer" className="primary-btn">View Airdrop <ArrowUpRight size={15}/></a>}{p.website && <a href={p.website} target="_blank" rel="noreferrer" className="glass-btn">Official Website <ArrowUpRight size={15}/></a>}<Link href="/calendar" className="glass-btn">View calendar</Link></div>{p.source && <small className="muted">Source: {p.source}</small>}</section></main>;
}
