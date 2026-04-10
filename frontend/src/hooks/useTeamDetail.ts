import { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import {
  fetchTeamDetail,
  fetchMatches,
  fetchStandings,
  resetTeamDetail,
} from '../features/sportsSlice';
import {
  addFavorite,
  removeFavorite,
  fetchFavorites,
  selectIsTeamFavorite,
} from '../features/favoritesSlice';
import { toast } from 'react-hot-toast';
import { useLanguage } from '../i18n';

export const useTeamDetail = () => {
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
  const { locale } = useLanguage();
  const favoriteRecord = useSelector((state: RootState) =>
    selectIsTeamFavorite(state, teamId || ""),
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

  const handleToggleFavorite = useCallback(async () => {
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
      if (isFavorite && favoriteRecord) {
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
            league_name: team.strLeague || "",
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
  }, [isAuthenticated, isFavorite, favoriteRecord, team, dispatch]);

  const formatToWIB = useCallback((timestamp?: string, defaultTime?: string) => {
    if (!timestamp) return defaultTime || "TBA";
    try {
      const date = new Date(timestamp);
      const dateLocale = locale === "id" ? "id-ID" : "en-US";
      return (
        date.toLocaleDateString(dateLocale, {
          weekday: "long",
          day: "numeric",
          month: "long",
        }) +
        " • " +
        date.toLocaleTimeString(dateLocale, {
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
  }, [locale]);

  const handleRetry = () => {
    if (teamId) {
      dispatch(fetchTeamDetail({ teamId, leagueName: leagueName || "" }));
      dispatch(fetchMatches(teamId));
    }
  };

  return {
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
  };
};
