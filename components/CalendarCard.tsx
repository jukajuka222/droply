import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/projects";
import { initials } from "@/lib/projects";

export default function CalendarCard() {
  const days = [
    ["31","1","2","3","4","5","6"],["7","8","9","10","11","12","13"],
    ["14","15","16","17","18","19","20"],["21","22","23","24","25","26","27"],["28","29","30","","","",""]
  ];
  const eventDays = new Set(["15","18","20","22","25","28","30"]);
  return <aside className="side-stack">
    <section className="glass-card calendar-card">
      <div className="card-title"><div><h3>September 2026</h3></div><div className="calendar-nav"><button><ChevronLeft size={15}/></button><button><ChevronRight size={15}/></button></div></div>
      <div className="weekdays">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(x=><span key={x}>{x}</span>)}</div>
      <div className="calendar-grid">
        {days.flat().map((d,i)=><div key={i} className={`day ${d==="18"?"selected":""} ${eventDays.has(d)?"has-event":""}`}>{d}{eventDays.has(d)&&<i/>}</div>)}
      </div>
      <div className="calendar-events">
        <div className="event-date"><b>Sep 18, 2026</b><span>3 events</span></div>
        {projects.slice(0,3).map(p=><Link href={`/project/${p.slug}`} className="mini-event" key={p.id}><div className="mini-icon">{initials(p.name)}</div><div><strong>{p.name}</strong><small>{p.event}</small></div><span>{p.chain}</span></Link>)}
        <Link href="/calendar" className="text-link">View all events →</Link>
      </div>
    </section>
    <section className="glass-card">
      <div className="card-title"><h3>Trending Chains</h3><Link href="/airdrops">View all →</Link></div>
      {["Base","Ethereum","Solana","Arbitrum","Aptos"].map((c,i)=><Link className="chain-row" href={`/airdrops?chain=${c}`} key={c}><span className="chain-icon">{c[0]}</span><span>{c}</span><small>{[512,438,376,221,154][i]} projects</small><ChevronRight size={15}/></Link>)}
    </section>
  </aside>
}