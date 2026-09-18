import { notFound } from "next/navigation";
import { getProjects, formatDate, getProject, initials } from "@/lib/projects";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, ExternalLink, Gift, Globe, Send, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{slug:string}> }) {
  const p = await getProject((await params).slug);
  return { title: p ? `${p.name} Airdrop — Droply` : "Project — Droply", description: p?.description };
}

function LinkRow({ icon, title, url }: { icon: React.ReactNode; title: string; url?: string }) {
  if (!url) return null;
  let host = url;
  try { host = new URL(url).hostname.replace(/^www\./, ""); } catch {}
  return <a className="detail-link-row" href={url} target="_blank" rel="noreferrer"><span className="detail-link-icon">{icon}</span><span><b>{title}</b><small>{host}</small></span><Copy size={15} /></a>;
}

export default async function ProjectPage({ params }: { params: Promise<{slug:string}> }) {
  const p = await getProject((await params).slug);
  if (!p) notFound();

  const steps = [
    { title: "Check eligibility", text: `Review the current ${p.name} requirements on the official source before participating.` },
    { title: "Open the official page", text: "Use the verified project/source link below and follow the currently published instructions." },
    { title: "Complete the listed tasks", text: "Only complete tasks shown by the project itself. Never share your seed phrase or private key." },
    { title: "Claim when available", text: `Watch the official source for the claim window and final eligibility confirmation${p.date ? ` around ${formatDate(p.date)}` : ""}.` }
  ];

  return <main className="page container project-page">
    <Link href="/airdrops" className="back-link">← All drops</Link>
    <div className="project-hero project-hero-rich">
      <div className="big-project-icon">{p.logo ? <img src={p.logo} alt="" /> : initials(p.name)}</div>
      <div className="project-main-copy">
        <h1>{p.name}</h1>
        <p>{p.description}</p>
        <div className="project-meta-row"><span className="meta-chip">Difficulty <b>Unknown</b></span><span className="meta-chip">Cost <b>Unknown</b></span><span className="meta-chip">Blockchain <b>{p.chain}</b></span><span className="meta-chip">Audit <b>Not checked</b></span><span className="meta-chip">Contract <b>Not checked</b></span></div>
        <div className="source-line">Source: {p.source || "Droply"}</div>
      </div>
      <div className="project-hero-action"><span className={`status-pill ${p.status.toLowerCase()}`}>{p.status}</span>{p.claimUrl ? <a href={p.claimUrl} target="_blank" rel="noreferrer" className="primary-btn project-cta"><Gift size={16}/> Start Now <ArrowUpRight size={15}/></a> : p.sourceUrl ? <a href={p.sourceUrl} target="_blank" rel="noreferrer" className="primary-btn project-cta"><ExternalLink size={16}/> View Source</a> : null}</div>
    </div>

    <div className="detail-layout">
      <section className="steps-card">
        <div className="detail-card-head"><div><span className="section-kicker">HOW TO PARTICIPATE</span><h2>How to participate</h2></div><span className="steps-count">0 / 4 steps</span></div>
        <div className="steps-body"><div className="step-tabs">{steps.map((step, i) => <div className={`step-tab ${i === 0 ? "active" : ""}`} key={step.title}><span>{i + 1}</span><b>{step.title}</b></div>)}</div><div className="step-content"><span className="step-number">Step 1 of 4</span><h3>{steps[0].title}</h3><p>{steps[0].text}</p><p className="step-note"><ShieldCheck size={14}/> Droply does not verify eligibility or guarantee rewards.</p><button className="glass-btn" disabled><Check size={14}/> Mark as done</button></div></div>
      </section>

      <aside className="links-card"><div className="detail-card-head"><div><span className="section-kicker">OFFICIAL RESOURCES</span><h2>Links</h2></div></div><div className="links-group"><span className="links-label"><Globe size={12}/> OFFICIAL LINKS</span><LinkRow icon={<Globe size={15}/>} title="Official Website" url={p.website}/><LinkRow icon={<Gift size={15}/>} title="Airdrop / Claim Page" url={p.claimUrl || p.sourceUrl}/></div>{p.x && <div className="links-group"><span className="links-label"><Send size={12}/> SOCIAL LINKS</span><LinkRow icon={<span>𝕏</span>} title="X (Twitter)" url={p.x}/></div>}</aside>
    </div>

    <section className="verification-card"><div className="verification-icon"><ShieldCheck size={16}/></div><div><span className="section-kicker">VERIFICATION</span><b>Not checked yet</b><p>We haven't independently verified this project's links, contract or audits. Check the official sources yourself before connecting a wallet.</p></div></section>

    <section className="article-card project-about"><span className="section-kicker">DROP DETAILS</span><h2>About {p.name}</h2><p>{p.description}</p><div className="source-actions">{p.sourceUrl && <a href={p.sourceUrl} target="_blank" rel="noreferrer" className="glass-btn">Open source <ExternalLink size={14}/></a>}<Link href="/calendar" className="glass-btn">View calendar</Link></div></section>
  </main>;
}
