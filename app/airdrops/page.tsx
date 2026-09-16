import ProjectTable from "@/components/ProjectTable";
import { getProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";
export const metadata = { title: "Airdrops" };

export default async function Airdrops() {
  const projects = await getProjects();
  return <main className="page container"><div className="page-head"><div><div className="section-kicker">DROP DISCOVERY</div><h1>Crypto Airdrops</h1><p>Upcoming, live and potential drops tracked automatically from multiple sources.</p></div></div><div className="filter-bar"><input placeholder="Search projects..."/><button>All Statuses⌄</button><button>All Chains⌄</button><button>All Events⌄</button></div><ProjectTable items={projects}/></main>;
}
