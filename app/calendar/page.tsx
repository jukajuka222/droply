import { projects } from "@/data/projects";
import { formatDate } from "@/lib/projects";

export const metadata = { title: "Calendar" };

export default function Calendar() {
  return <main className="page container"><div className="page-head"><div><div className="section-kicker">DROP CALENDAR</div><h1>September 2026</h1><p>Snapshots, TGE dates, claims and airdrop events.</p></div><div className="calendar-nav large"><button>←</button><button>→</button></div></div><div className="event-list">{projects.map(p=><div className="event-card" key={p.id}><div className="event-date-big"><b>{new Date(p.date+"T12:00:00").getDate()}</b><span>SEP</span></div><div><h3>{p.name}</h3><p>{p.event} · {p.chain}</p></div><span className={`status-pill ${p.status.toLowerCase()}`}>{p.status}</span><span className="muted">{formatDate(p.date)}</span></div>)}</div></main>
}