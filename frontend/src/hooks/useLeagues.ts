import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { fetchLeagues } from '../features/sportsSlice';

export const useLeagues = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState("");
  const { leagues, leaguesStatus: status } = useSelector((state: RootState) => state.sports);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLeagues());
    }
  }, [status, dispatch]);

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

  const groupedLeagues = useMemo(() => {
    const groups: Record<string, typeof filteredLeagues> = {};
    filteredLeagues.forEach((league) => {
      if (!groups[league.strSport]) {
        groups[league.strSport] = [];
      }
      groups[league.strSport].push(league);
    });

    // Sort categories: Soccer first, then alphabetical
    return Object.keys(groups)
      .sort((a, b) => {
        if (a === "Soccer") return -1;
        if (b === "Soccer") return 1;
        return a.localeCompare(b);
      })
      .reduce(
        (acc, key) => {
          acc[key] = groups[key];
          return acc;
        },
        {} as Record<string, typeof filteredLeagues>,
      );
  }, [filteredLeagues]);

  const handleRetry = () => {
    dispatch(fetchLeagues());
  };

  return {
    leagues,
    filteredLeagues,
    groupedLeagues,
    status,
    searchQuery,
    setSearchQuery,
    handleRetry,
  };
};
