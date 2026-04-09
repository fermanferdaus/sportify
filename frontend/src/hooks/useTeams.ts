import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { fetchTeams } from '../features/sportsSlice';

export const useTeams = () => {
  const { leagueName } = useParams<{ leagueName: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    teams,
    teamsStatus: status,
    error,
  } = useSelector((state: RootState) => state.sports);

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

  const handleRetry = () => {
    if (leagueName) {
      dispatch(fetchTeams(leagueName));
    }
  };

  return {
    leagueName,
    teams,
    filteredTeams,
    status,
    error,
    searchQuery,
    setSearchQuery,
    handleRetry,
  };
};
