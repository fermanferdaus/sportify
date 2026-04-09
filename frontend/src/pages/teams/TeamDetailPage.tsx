import { useTeamDetail } from "../../hooks/useTeamDetail";
import PageLoader from "../../components/ui/PageLoader";
import TeamDetailHeader from "../../components/teams/TeamDetailHeader";
import TeamDetailBanner from "../../components/teams/TeamDetailBanner";
import TeamLegacyCard from "../../components/teams/TeamLegacyCard";
import StandingsTable from "../../components/teams/StandingsTable";
import MatchTimeline from "../../components/teams/MatchTimeline";
import TeamStatsSidebar from "../../components/teams/TeamStatsSidebar";
import LeaguesError from "../../components/leagues/LeaguesError";

const TeamDetailPage = () => {
  const {
    teamId,
    leagueName,
    team,
    matches,
    standings,
    detailStatus,
    matchesStatus,
    standingsStatus,
    isFavorite,
    handleToggleFavorite,
    formatToWIB,
    handleRetry,
  } = useTeamDetail();

  if (detailStatus === "loading" && !team) {
    return <PageLoader message="Loading data..." />;
  }

  if (detailStatus === "failed") {
    return <LeaguesError onRetry={handleRetry} />;
  }

  if (!team) return null;

  return (
    <div key={teamId} className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 space-y-12">
      {/* 1. Global Navigation Section */}
      <TeamDetailHeader
        team={team}
        leagueName={leagueName}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* 2. Premium Branding Banner */}
      <TeamDetailBanner team={team} />

      {/* 3. Integrated Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 pt-4 relative z-10">
        {/* Main Content Area (8 Columns) */}
        <div className="lg:col-span-8 space-y-12">
          {/* Historical Context & Legacy */}
          <TeamLegacyCard team={team} />

          {/* League Grid / Standings Performance */}
          <StandingsTable
            standings={standings}
            status={standingsStatus}
            targetTeamId={team.idTeam}
          />
        </div>

        {/* Sidebar Utilities (4 Columns) */}
        <div className="lg:col-span-4 space-y-12">
          {/* Quick Metrics & Links */}
          <TeamStatsSidebar team={team} />

          {/* Historical & Upcoming Fixtures */}
          <MatchTimeline
            matches={matches}
            status={matchesStatus}
            formatToWIB={formatToWIB}
          />
        </div>
      </div>

      {/* Decorative Perspective Background Glow */}
      <div className="fixed -top-40 -left-40 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full z-0 pointer-events-none" />
    </div>
  );
};

export default TeamDetailPage;
