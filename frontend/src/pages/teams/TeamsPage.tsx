import { useTeams } from "../../hooks/useTeams";
import PageLoader from "../../components/ui/PageLoader";
import TeamsHero from "../../components/teams/TeamsHero";
import TeamsSearch from "../../components/teams/TeamsSearch";
import TeamCard from "../../components/teams/TeamCard";
import TeamsEmpty from "../../components/teams/TeamsEmpty";
import LeaguesError from "../../components/leagues/LeaguesError";

const TeamsPage = () => {
  const {
    leagueName,
    teams,
    filteredTeams,
    status,
    searchQuery,
    setSearchQuery,
    handleRetry,
  } = useTeams();

  if (status === "loading" && teams.length === 0) {
    return <PageLoader message="Loading data..." />;
  }

  if (status === "failed") {
    return <LeaguesError onRetry={handleRetry} />;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 space-y-12">
      {/* Dynamic Header Section */}
      <TeamsHero leagueName={leagueName || "Global"} teamCount={teams.length} />

      {/* Filter & Search Bar */}
      <section className="px-4 flex justify-center md:justify-end">
        <TeamsSearch value={searchQuery} onChange={setSearchQuery} />
      </section>

      {/* Clubs Grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4 px-4 overflow-visible">
        {filteredTeams.map((team, index) => (
          <TeamCard
            key={team.idTeam}
            team={team}
            index={index}
            leagueName={leagueName || ""}
          />
        ))}

        {/* Empty States */}
        {filteredTeams.length === 0 && teams.length > 0 && (
          <TeamsEmpty type="search" onClear={() => setSearchQuery("")} />
        )}

        {teams.length === 0 && status === "succeeded" && (
          <TeamsEmpty type="database" />
        )}
      </div>

      {/* Perspective Decorative element */}
      <div className="fixed -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full z-0 pointer-events-none animate-pulse" />
    </div>
  );
};

export default TeamsPage;
