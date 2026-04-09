import { useState, useEffect } from "react";
import { useLeagues } from "../../hooks/useLeagues";
import PageLoader from "../../components/ui/PageLoader";
import LeaguesHero from "../../components/leagues/LeaguesHero";
import LeaguesSearch from "../../components/leagues/LeaguesSearch";
import LeagueCard from "../../components/leagues/LeagueCard";
import LeagueCategory from "../../components/leagues/LeagueCategory";
import LeaguesError from "../../components/leagues/LeaguesError";
import LeaguesEmpty from "../../components/leagues/LeaguesEmpty";

const LeaguesPage = () => {
  const {
    leagues,
    filteredLeagues,
    groupedLeagues,
    status,
    searchQuery,
    setSearchQuery,
    handleRetry,
  } = useLeagues();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (status === "loading" && leagues.length === 0) {
    return <PageLoader message="Loading data..." />;
  }

  if (status === "failed") {
    return <LeaguesError onRetry={handleRetry} />;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-16 pb-20">
      {/* Interactive Hero Section */}
      <LeaguesHero />

      {/* Global Filter Bar - Animated Appearance on Scroll */}
      <div
        className={`transition-all duration-700 ease-in-out transform ${
          isScrolled
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-10 scale-95 pointer-events-none"
        }`}
      >
        <LeaguesSearch value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Content Sections */}
      <div className="space-y-20 px-4">
        {Object.entries(groupedLeagues).map(([sport, sportLeagues]) => (
          <LeagueCategory key={sport} sport={sport}>
            {sportLeagues.map((league, index) => (
              <LeagueCard key={league.idLeague} league={league} index={index} />
            ))}
          </LeagueCategory>
        ))}

        {/* Empty States */}
        {filteredLeagues.length === 0 && leagues.length > 0 && (
          <LeaguesEmpty type="search" onClear={() => setSearchQuery("")} />
        )}

        {leagues.length === 0 && status === "succeeded" && (
          <LeaguesEmpty type="database" />
        )}
      </div>
    </div>
  );
};

export default LeaguesPage;
