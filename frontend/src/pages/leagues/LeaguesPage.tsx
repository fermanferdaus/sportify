import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store";
import { fetchLeagues } from "../../features/sportsSlice";
import {
  Trophy,
  ArrowRight,
  Search as SearchIcon,
  Globe,
  Info,
} from "lucide-react";
import PageLoader from "../../components/ui/PageLoader";

const LeaguesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { leagues, status, error } = useSelector(
    (state: RootState) => state.sports,
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLeagues());
    }
  }, [status, dispatch]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / (width / 2);
    const y = (clientY - top - height / 2) / (height / 2);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const filteredLeagues = useMemo(() => {
    return leagues.filter(
      (league) =>
        league.strLeague.toLowerCase().includes(searchQuery.toLowerCase()) ||
        league.strSport.toLowerCase().includes(searchQuery.toLowerCase()) ||
        league.strLeagueAlternate
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()),
    );
  }, [leagues, searchQuery]);

  if (status === "loading" && leagues.length === 0) {
    return <PageLoader message="Discovering top soccer leagues..." />;
  }

  if (status === "failed") {
    return (
      <div className="rounded-3xl border border-red-900/40 bg-red-950/20 p-12 text-center backdrop-blur-sm max-w-2xl mx-auto my-12 animate-in fade-in zoom-in duration-500">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 text-red-500 border border-red-500/20">
          <Globe size={40} className="animate-pulse" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Connection Issue</h3>
        <p className="text-slate-400 mb-8 leading-relaxed">
          We're having trouble connecting to the sports database. This might be
          a temporary network issue or API limit.
        </p>
        <button
          onClick={() => dispatch(fetchLeagues())}
          className="rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-8 py-3.5 text-sm font-bold text-white hover:scale-105 transition-all shadow-lg shadow-red-600/20 active:scale-95"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-16 pb-20">
      {/* Hero Section */}
      <section
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative pt-12 pb-6 flex flex-col items-center text-center perspective-1000 overflow-visible"
      >
        <div
          className="relative z-10 flex flex-col items-center gap-6 transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: `translate3d(${mousePos.x * 10}px, ${mousePos.y * 10}px, 0) rotateX(${-mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`,
          }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-1000 transition-transform duration-500 ease-out"
            style={{
              transform: `translate3d(${mousePos.x * 15}px, ${mousePos.y * 15}px, 0)`,
            }}
          >
            <Trophy size={14} className="animate-bounce" />
            Leading Sports Destination
          </div>
          <h1
            className="text-4xl md:text-7xl font-extrabold tracking-tight sm:text-6xl text-gradient perspective-1000 animate-in fade-in zoom-in-95 duration-1000 delay-100 transition-transform duration-700 ease-out"
            style={{
              transform: `translate3d(${mousePos.x * 25}px, ${mousePos.y * 25}px, 0) rotateZ(${mousePos.x * 2}deg)`,
            }}
          >
            Elite Soccer <br />
            <span className="text-white">Leagues Worldwide</span>
          </h1>
          <p
            className="max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 transition-transform duration-1000 ease-out"
            style={{
              transform: `translate3d(${mousePos.x * 40}px, ${mousePos.y * 40}px, 0)`,
            }}
          >
            Experience the thrill of global football. Explore detailed team
            profiles, exclusive statistics, and upcoming clash schedules from
            the world's most prestigious leagues.
          </p>
        </div>

        {/* Background glow in hero */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full -z-10 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate3d(${-mousePos.x * 50}px, ${-mousePos.y * 50}px, 0) scale(${1 + Math.abs(mousePos.x) * 0.1})`,
          }}
        />
      </section>

      {/* Search/Filter Bar */}
      <div className="relative max-w-2xl mx-auto px-4 z-20">
        <div className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-500">
          <SearchIcon size={20} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for your favorite league..."
          className="w-full bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-2xl"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4">
        {filteredLeagues.map((league, index) => (
          <div
            key={league.idLeague}
            onClick={() =>
              navigate(`/leagues/${encodeURIComponent(league.strLeague)}/teams`)
            }
            style={{ animationDelay: `${index * 50}ms` }}
            className="glass-card group relative p-8 cursor-pointer rounded-3xl overflow-hidden hover:scale-[1.03] active:scale-[0.98] animate-in fade-in slide-in-from-bottom-6 duration-700"
          >
            {/* Glossy overlay effect */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 flex flex-col items-center text-center gap-6">
              <div className="h-24 w-24 flex items-center justify-center rounded-3xl bg-slate-800 border-2 border-slate-700/50 group-hover:border-blue-500/50 transition-all group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                {league.strBadge ? (
                  <img
                    src={league.strBadge}
                    alt={league.strLeague}
                    className="h-16 w-16 object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <Trophy
                    size={32}
                    className="text-slate-600 group-hover:text-blue-400 transition-colors"
                  />
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                  {league.strLeague}
                </h3>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-all">
                  {league.strSport}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm font-bold text-blue-500 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 mt-2">
                Explore Teams <ArrowRight size={16} />
              </div>
            </div>
          </div>
        ))}

        {filteredLeagues.length === 0 && leagues.length > 0 && (
          <div className="col-span-full py-20 text-center glass-card rounded-3xl border-dashed border-slate-800">
            <Info
              size={48}
              className="mx-auto text-slate-700 mb-4 animate-pulse"
            />
            <p className="text-xl text-slate-300 font-bold uppercase tracking-widest">
              No leagues matches your search
            </p>
            <p className="text-slate-500 mt-2">
              Try searching for a different league or dynamic sport.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-6 text-blue-500 font-bold hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}

        {leagues.length === 0 && status === "succeeded" && (
          <div className="col-span-full py-20 text-center">
            <Globe size={48} className="mx-auto text-slate-700 mb-4" />
            <p className="text-xl text-slate-500 font-medium">
              No leagues available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaguesPage;
