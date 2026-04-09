import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronLeft,
  MapPin,
  Users,
  Globe,
  Trophy,
  Calendar,
  ExternalLink,
  History,
  Info,
  ChevronRight,
  Heart,
} from "lucide-react";
import type { AppDispatch, RootState } from "../../store";
import {
  fetchTeamDetail,
  fetchMatches,
  fetchStandings,
  resetTeamDetail,
} from "../../features/sportsSlice";
import {
  addFavorite,
  removeFavorite,
  fetchFavorites,
  selectIsTeamFavorite,
} from "../../features/favoritesSlice";
import PageLoader from "../../components/ui/PageLoader";
import { toast } from "react-hot-toast";

const TeamDetailPage = () => {
  const { teamId, leagueName } = useParams<{
    teamId: string;
    leagueName?: string;
  }>();
  const dispatch = useDispatch<AppDispatch>();

  const {
    selectedTeamDetail: team,
    matches,
    standings,
    detailStatus,
    matchesStatus,
    standingsStatus,
  } = useSelector((state: RootState) => state.sports);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const favoriteRecord = useSelector((state: RootState) =>
    selectIsTeamFavorite(state, teamId),
  );
  const isFavorite = !!favoriteRecord;
  const favoritesStatus = useSelector(
    (state: RootState) => state.favorites.status,
  );

  useEffect(() => {
    if (teamId) {
      dispatch(fetchTeamDetail({ teamId, leagueName: leagueName || "" }));
      dispatch(fetchMatches(teamId));
    }
    return () => {
      dispatch(resetTeamDetail());
    };
  }, [teamId, leagueName, dispatch]);

  useEffect(() => {
    if (team?.idLeague) {
      dispatch(fetchStandings(team.idLeague));
    }
  }, [team?.idLeague, dispatch]);

  useEffect(() => {
    if (isAuthenticated && favoritesStatus === "idle") {
      dispatch(fetchFavorites());
    }
  }, [isAuthenticated, favoritesStatus, dispatch]);

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add favorites", {
        style: {
          background: "#0f172a",
          color: "#fff",
          border: "1px solid #1e293b",
        },
      });
      return;
    }

    if (!team) return;

    try {
      if (isFavorite) {
        await dispatch(removeFavorite(favoriteRecord.id)).unwrap();
        toast.success(`${team.strTeam} removed from favorites`, {
          icon: "💔",
          style: {
            background: "#0f172a",
            color: "#fff",
            border: "1px solid #1e293b",
          },
        });
      } else {
        await dispatch(
          addFavorite({
            team_id: team.idTeam,
            team_name: team.strTeam,
            team_badge: team.strBadge,
            league_name: team.strLeague,
          }),
        ).unwrap();
        toast.success(`${team.strTeam} added to favorites!`, {
          icon: "❤️",
          style: {
            background: "#0f172a",
            color: "#fff",
            border: "1px solid #1e293b",
          },
        });
      }
    } catch (error: any) {
      toast.error(error || "Action failed");
    }
  };

  const formatToWIB = (timestamp?: string, defaultTime?: string) => {
    if (!timestamp) return defaultTime || "TBA";
    try {
      const date = new Date(timestamp);
      return (
        date.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
        }) +
        " • " +
        date.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Jakarta",
        }) +
        " WIB"
      );
    } catch {
      return defaultTime || "TBA";
    }
  };

  if (detailStatus === "loading" && !team) {
    return <PageLoader message={`Loading data...`} />;
  }

  if (detailStatus === "failed") {
    return (
      <div className="rounded-3xl border border-red-900/40 bg-red-950/20 p-12 text-center backdrop-blur-sm max-w-2xl mx-auto my-12 animate-in fade-in zoom-in duration-500">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 text-red-500 border border-red-500/20">
          <Info size={40} className="animate-pulse" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Access Denied</h3>
        <p className="text-slate-400 mb-8 font-medium">
          The requested team profile is currently unavailable on the sports
          grid.
        </p>
        <Link
          to={
            leagueName
              ? `/leagues/${encodeURIComponent(leagueName)}/teams`
              : team?.strLeague
                ? `/leagues/${encodeURIComponent(team.strLeague)}/teams`
                : "/"
          }
          className="rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-8 py-3.5 text-sm font-bold text-white hover:scale-105 transition-all shadow-lg active:scale-95 flex items-center gap-2 mx-auto w-fit"
        >
          <ChevronLeft size={18} /> Return to Listing
        </Link>
      </div>
    );
  }

  if (!team) return null;

  return (
    <div
      key={teamId}
      className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 space-y-8"
    >
      {/* Top Header Section: Compact & Aligned */}
      <section className="flex items-center justify-between pt-2 md:pt-2 px-4">
        <Link
          to={
            leagueName
              ? `/leagues/${encodeURIComponent(leagueName)}/teams`
              : team?.strLeague
                ? `/leagues/${encodeURIComponent(team.strLeague)}/teams`
                : "/"
          }
          className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors group"
        >
          <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 group-hover:border-blue-500/50 group-hover:bg-slate-800 transition-all shadow-lg">
            <ChevronLeft size={18} />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em] hidden sm:block">
            Back to Teams
          </span>
        </Link>

        {/* Mini Breadcrumb Consistent with Elite design */}
        <div className="px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-slate-900/50 border border-slate-800 text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5 md:gap-2">
          <span className="truncate max-w-[80px] md:max-w-none">
            {leagueName || team.strLeague}
          </span>
          <ChevronRight size={8} className="text-slate-700 md:hidden" />
          <ChevronRight size={10} className="text-slate-700 hidden md:block" />
          <span className="text-blue-500 truncate max-w-[100px] md:max-w-none">
            {team.strTeam}
          </span>
        </div>

        {/* Favorite Toggle Action */}
        <button
          onClick={handleToggleFavorite}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 group ${
            isFavorite
              ? "bg-rose-500/10 border-rose-500/30 text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.1)]"
              : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
          }`}
        >
          <Heart
            size={18}
            className={`transition-transform duration-300 ${
              isFavorite ? "fill-rose-500 scale-110" : "group-hover:scale-110"
            }`}
          />
          <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">
            {isFavorite ? "Favorited" : "Add favorite"}
          </span>
        </button>
      </section>

      {/* Modern Entity Header (Integrated Banner) */}
      <section className="px-4">
        <div className="relative group">
          {/* Background Layer: Plain Dark Gradient (No Image) */}
          <div className="relative h-[370px] md:h-[250px] w-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl bg-slate-900/50">
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
            {/* Background glow consistent with TeamsPage */}
            <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full" />
          </div>

          {/* Identity Content: Responsive Positioning */}
          <div className="relative -mt-85 md:mt-0 md:absolute md:bottom-[20px] md:left-8 md:right-8 flex flex-col md:flex-row items-center md:items-end justify-between gap-8 z-20 px-4 md:px-0">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
              {/* Logo with Premium Frame */}
              <div className="h-40 w-40 md:h-52 md:w-52 flex items-center justify-center rounded-[1.5rem] md:rounded-[2rem] bg-slate-950 border-8 border-[#020617] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 group-hover:scale-105 transition-transform duration-500">
                <img
                  src={team.strBadge}
                  alt={team.strTeam}
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                />
              </div>
              {/* Text Identity */}
              <div className="text-center md:text-left md:pb-6 space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-gradient leading-tight">
                  {team.strTeam}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                    <Trophy size={14} /> {team.strLeague}
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/60 border border-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    <MapPin size={14} className="text-blue-500" />{" "}
                    {team.strLocation}
                  </div>
                </div>
              </div>
            </div>

            {/* Year Formed Badge (Sidebar of the header) */}
            <div className="hidden lg:flex flex-col items-end gap-2 pb-10 opacity-60 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
                Established Since
              </span>
              <span className="text-4xl font-black text-white/50 tracking-widest">
                {team.intFormedYear}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Content Re-Balanced */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 pt-12">
        {/* Left Column (Main Data) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Enhanced Club Story Card */}
          <section className="glass-card p-10 md:p-14 rounded-[1.5rem] md:rounded-[2rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 text-blue-500/5 group-hover:text-blue-500/10 transition-colors duration-500">
              <History size={180} strokeWidth={1} />
            </div>
            <div className="relative z-10 space-y-10">
              <div className="flex items-center gap-4">
                <div className="h-10 w-1 pt-1 bg-blue-600 rounded-full" />
                <h2 className="text-2xl font-black text-white tracking-widest uppercase text-sm">
                  Legacy Registry
                </h2>
              </div>
              <p className="text-slate-400 leading-relaxed text-xl font-medium italic border-l-4 border-blue-500/30 pl-8 py-2">
                Representing {team.strLocation} within the elite tiers of{" "}
                {team.strLeague}, {team.strTeam} carries a legacy of athletic
                excellence since {team.intFormedYear}.
              </p>
              <div className="grid gap-6 text-slate-300/80 leading-relaxed font-inter text-lg">
                {team.strDescriptionEN
                  ?.split("\n")
                  .filter((p) => p.trim())
                  .slice(0, 3)
                  .map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
              </div>
            </div>
          </section>

          {/* Performance Dashboard (Standings) - Moved Inside Left Column to eliminate gap */}
          <section className="glass-card rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/5">
            <div className="p-10 md:p-14 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-1 pt-1 bg-yellow-500 rounded-full" />
                <h2 className="text-2xl font-black text-white tracking-widest uppercase text-sm">
                  League Grid Sync
                </h2>
              </div>
              <div className="px-5 py-2 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Live: 2024/25 Season
                </span>
              </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-900 shadow-sm text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
                    <th className="px-10 py-8 w-16 text-center">Rank</th>
                    <th className="px-4 py-8">Entity</th>
                    <th className="px-4 py-8 text-center text-slate-600">P</th>
                    <th className="px-4 py-8 text-center text-green-500/50">
                      W
                    </th>
                    <th className="px-4 py-8 text-center text-slate-600">D</th>
                    <th className="px-4 py-8 text-center text-red-500/50">L</th>
                    <th className="px-4 py-8 text-center text-white">Pts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/10 font-bold font-inter">
                  {standingsStatus === "loading" ? (
                    <tr>
                      <td colSpan={7} className="py-24 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="h-10 w-10 border-4 border-slate-800 border-t-blue-600 rounded-full animate-spin" />
                          <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                            Aggregating Global Standings...
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : standings && standings.length > 0 ? (
                    standings.map((row) => {
                      const isTarget = row.idTeam === team.idTeam;
                      return (
                        <tr
                          key={row.idTeam}
                          className={`transition-all ${isTarget ? "bg-blue-600/10" : "hover:bg-white/[0.02]"}`}
                        >
                          <td className="px-10 py-6">
                            <div
                              className={`flex items-center justify-center w-8 h-8 rounded-lg text-xs font-black ${isTarget ? "bg-blue-600 text-white" : "text-slate-600 border border-slate-800"}`}
                            >
                              {row.intRank}
                            </div>
                          </td>
                          <td className="px-4 py-6">
                            <div className="flex items-center gap-4">
                              <img
                                src={row.strBadge}
                                alt=""
                                className="w-8 h-8 object-contain"
                              />
                              <span
                                className={`text-sm tracking-tight ${isTarget ? "text-blue-400 font-black uppercase" : "text-slate-300 font-semibold"}`}
                              >
                                {row.strTeam}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-6 text-center text-slate-500">
                            {row.intPlayed}
                          </td>
                          <td className="px-4 py-6 text-center text-green-500/60">
                            {row.intWin}
                          </td>
                          <td className="px-4 py-6 text-center text-slate-600">
                            {row.intDraw}
                          </td>
                          <td className="px-4 py-6 text-center text-red-500/60">
                            {row.intLoss}
                          </td>
                          <td className="px-4 py-6 text-center font-black text-white text-lg">
                            {row.intPoints}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-28 text-center bg-slate-900/10"
                      >
                        <div className="flex flex-col items-center gap-6 max-w-xs mx-auto">
                          <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-600">
                            <Info size={32} strokeWidth={1.5} />
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-sm font-black text-white uppercase tracking-widest">
                              Registry Not Found
                            </h4>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                              Official standings data for this sport category is
                              currently restricted or unavailable.
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Sidebar (Utility Blocks) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Quick Connect Registry */}
          <div className="glass-card p-10 rounded-[1.5rem] md:rounded-[2rem] space-y-8 group">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-3">
              <Globe size={14} className="text-blue-600" /> Web Node
            </h3>
            <a
              href={`https://${team.strWebsite}`}
              target="_blank"
              rel="noreferrer"
              className="group/link flex items-center justify-between p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:bg-blue-600 transition-all shadow-xl"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-500 group-hover/link:text-blue-200 transition-colors uppercase tracking-widest">
                  Domain Portal
                </span>
                <span className="text-sm font-bold text-white uppercase tracking-tight truncate">
                  {team.strWebsite}
                </span>
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 group-hover/link:bg-blue-700 group-hover/link:text-white transition-all">
                <ExternalLink size={20} />
              </div>
            </a>
          </div>

          {/* Season Fixtures (Vertical Timeline) */}
          <div className="glass-card p-10 rounded-[1.5rem] md:rounded-[2rem]">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
                Season Fixtures
              </h3>
              <Calendar size={18} className="text-slate-800" />
            </div>
            <div className="space-y-6">
              {matchesStatus === "loading" ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-32 bg-slate-900 rounded-[2rem] animate-pulse"
                    />
                  ))}
                </div>
              ) : matches && matches.length > 0 ? (
                matches.slice(0, 5).map((m: any) => (
                  <div key={m.idEvent} className="relative pl-8 group/item">
                    {/* Vertical Line Connector */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-800 group-hover/item:bg-blue-600 transition-colors" />
                    <div className="absolute left-[-4px] top-6 h-2 w-2 rounded-full bg-slate-800 border-2 border-[#020617] group-hover/item:bg-blue-500 transition-all group-hover/item:scale-150" />

                    <div className="p-6 rounded-3xl bg-slate-900 group-hover/item:bg-blue-600/5 transition-all border border-transparent hover:border-white/5 cursor-default">
                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-4">
                        {formatToWIB(m.strTimestamp, m.strTime)}
                      </span>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-sm font-bold tracking-tight text-white group-hover/item:text-blue-400">
                          <span className="truncate max-w-[120px]">
                            {m.strHomeTeam}
                          </span>
                          <span className="px-2 py-1 bg-slate-800 text-[10px] rounded text-slate-500">
                            VS
                          </span>
                          <span className="truncate max-w-[120px] text-right">
                            {m.strAwayTeam}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                        <MapPin size={10} /> {m.strVenue || "Arena Registered"}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center glass-card rounded-[1.5rem] md:rounded-[2rem] border-dashed">
                  <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">
                    Registry Vacant
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Arena Details (Repositioned to Sidebar) */}
          <div className="space-y-6">
            <div className="glass-card p-8 rounded-[1.5rem] md:rounded-[2rem] flex items-center gap-6 group hover:bg-slate-800/20 transition-all shadow-sm">
              <div className="h-16 w-16 flex items-center justify-center rounded-[1.2rem] bg-blue-500/10 text-blue-500 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg shadow-blue-500/5">
                <MapPin size={24} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-1">
                  Official Grounds
                </span>
                <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                  {team.strStadium || "Elite Grounds"}
                </h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">
                  {team.strStadiumLocation || team.strLocation}
                </p>
              </div>
            </div>
            <div className="glass-card p-8 rounded-[1.5rem] md:rounded-[2rem] flex items-center gap-6 group hover:bg-slate-800/20 transition-all shadow-sm">
              <div className="h-16 w-16 flex items-center justify-center rounded-[1.2rem] bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg shadow-indigo-500/5">
                <Users size={24} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-1">
                  Grid Capacity
                </span>
                <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors leading-tight">
                  {team.intStadiumCapacity
                    ? Number(team.intStadiumCapacity).toLocaleString()
                    : "Data Restricted"}
                </h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">
                  Attendance Registry
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailPage;
