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
    <div
      key={teamId}
      className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 space-y-8"
    >
      {/* 1. Global Navigation Section */}
      <TeamDetailHeader
        team={team}
        leagueName={leagueName}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* 2. Premium Branding Banner */}
      <TeamDetailBanner team={team} />

      {/* 3. Integrated Information Grid - Responsive Ordering */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 px-4 relative z-10">
        {/* Legacy Registry (Order 1) */}
        <div className="order-1 lg:col-span-8 space-y-12">
          <TeamLegacyCard team={team} />
        </div>

        {/* Sidebar Statistics (Order 2 on Mobile, Right Column on Desktop) */}
        <div className="order-2 lg:col-span-4 lg:col-start-9 lg:row-span-2 space-y-12">
          <TeamStatsSidebar team={team} />
        </div>

        {/* Season Fixtures (Order 3) */}
        <div className="order-3 lg:col-span-8 lg:col-start-1 space-y-12">
          <MatchTimeline
            matches={matches}
            status={matchesStatus}
            formatToWIB={formatToWIB}
          />
        </div>

        {/* League Standings (Order 4) */}
        <div className="order-4 lg:col-span-8 lg:col-start-1 space-y-12">
          <StandingsTable
            standings={standings}
            status={standingsStatus}
            targetTeamId={team.idTeam}
          />
        </div>
      </div>

      {/* Decorative Perspective Background Glow */}
      <div className="fixed -top-40 -left-40 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full z-0 pointer-events-none" />
    </div>
  );
};

export default TeamDetailPage;
