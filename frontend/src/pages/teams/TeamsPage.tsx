import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronLeft,
  Trophy,
  Search,
  Users,
  LayoutGrid,
  Info,
} from "lucide-react";
import type { AppDispatch, RootState } from "../../store";
import { fetchTeams } from "../../features/sportsSlice";
import PageLoader from "../../components/ui/PageLoader";
import { useInView } from "react-intersection-observer";

// Skeleton component for lazy loading images
const ImageSkeleton = () => (
  <div className="absolute inset-0 bg-slate-800 animate-pulse rounded-2xl flex items-center justify-center">
    <Trophy size={24} className="text-slate-700 opacity-20" />
  </div>
);

const TeamsPage = () => {
  const { leagueName } = useParams<{ leagueName: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { teams, teamsStatus: status, error } = useSelector(
    (state: RootState) => state.sports,
  );

  useEffect(() => {
    if (leagueName) {
      dispatch(fetchTeams(leagueName));
    }
  }, [leagueName, dispatch]);

  const filteredTeams = useMemo(() => {
    return teams.filter(
      (team) =>
        team.strTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.strStadium?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.strLocation?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [teams, searchQuery]);

  if (status === "loading" && teams.length === 0) {
    return <PageLoader message={`Loading data...`} />;
  }

  if (status === "failed") {
    return (
      <div className="rounded-3xl border border-red-900/40 bg-red-950/20 p-12 text-center backdrop-blur-sm max-w-2xl mx-auto my-12">
        <h3 className="text-2xl font-bold text-white mb-2">
          Failed to Scout Teams
        </h3>
        <p className="text-slate-400 mb-6">{error}</p>
        <button
          onClick={() => leagueName && dispatch(fetchTeams(leagueName))}
          className="rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white hover:bg-red-500 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Global background glow - High Stability Placement */}
      <div className="fixed -top-20 -right-20 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full z-0 pointer-events-none animate-pulse duration-[15s]" />

      {/* Dynamic Header */}
      <section className="relative pt-2 pb-12 px-4 z-10 overflow-visible">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 mb-8 transition-colors group"
        >
          <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-900 border border-slate-800 group-hover:border-blue-500/50">
            <ChevronLeft size={16} />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest">
            Back to Leagues
          </span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
              <Users size={12} /> {teams.length} Teams Registered
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
              {leagueName} <span className="text-blue-500">Clubs</span>
            </h1>
            <p className="text-slate-400 max-w-xl text-lg mb-0 text-balance">
              Discover the history, current roster, and upcoming events of every
              club competing in the {leagueName}.
            </p>
          </div>

          <div className="relative w-full md:w-80 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search club name..."
              className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Teams Grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 px-4">
        {filteredTeams.map((team, index) => (
          <TeamCard 
            key={team.idTeam} 
            team={team} 
            index={index} 
            leagueName={leagueName || ""}
            navigate={navigate} 
          />
        ))}

        {filteredTeams.length === 0 && teams.length > 0 && (
          <div className="col-span-full py-20 text-center glass-card rounded-[2.5rem] border-dashed border-slate-800">
            <Info
              size={48}
              className="mx-auto text-slate-700 mb-4 animate-pulse"
            />
            <p className="text-xl text-slate-300 font-bold uppercase tracking-widest">
              No clubs matches your search
            </p>
            <p className="text-slate-500 mt-2">
              Try searching for a different club name or city.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-6 text-blue-500 font-bold hover:underline"
            >
              Show all teams
            </button>
          </div>
        )}

        {teams.length === 0 && status === "succeeded" && (
          <div className="col-span-full py-20 text-center bg-slate-900/20 border border-slate-800 rounded-3xl">
            <Trophy size={48} className="mx-auto text-slate-800 mb-4" />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-lg">
              No teams found in this league.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const TeamCard = ({ 
  team, 
  index, 
  leagueName, 
  navigate 
}: { 
  team: any, 
  index: number, 
  leagueName: string, 
  navigate: any 
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      ref={ref}
      onClick={() => navigate(`/teams/${team.idTeam}/${encodeURIComponent(leagueName)}`)}
      style={{ 
        animationDelay: `${(index % 8) * 80}ms`,
        opacity: inView ? 1 : 0,
        transform: inView 
          ? 'perspective(1000px) rotateX(0) scale(1) translateY(0)' 
          : 'perspective(1000px) rotateX(15deg) scale(0.9) translateY(40px)',
        filter: inView ? 'blur(0)' : 'blur(8px)',
        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
      className={`glass-card group p-4 sm:p-8 cursor-pointer rounded-3xl text-center relative overflow-hidden active:scale-95 transition-all duration-500 ${
        inView ? 'animate-in fade-in' : ''
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
      
      {/* Background glow shadow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

      <div className="relative z-10 space-y-6">
        <div className="relative mx-auto">
          <div className="relative h-28 w-28 mx-auto flex items-center justify-center rounded-2xl bg-slate-800 border border-slate-700/50 group-hover:border-blue-500/50 transition-all group-hover:scale-110 group-hover:rotate-3 shadow-xl">
            {!imgLoaded && <ImageSkeleton />}
            <img
              src={team.strBadge}
              alt={team.strTeam}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              className={`h-20 w-20 object-contain transition-all duration-500 ${
                imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
          />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
            {team.strTeam}
          </h3>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
            {team.strStadium || "Elite Stadium"}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          Since {team.intFormedYear || "Unknown"}
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
