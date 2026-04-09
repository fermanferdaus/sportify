import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import api from '../lib/api';

// Types
export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
  strBadge?: string;
}

export interface Team {
  idTeam: string;
  strTeam: string;
  strBadge: string;
  strDescriptionEN?: string;
  strStadium?: string;
  strStadiumThumb?: string;
  strTeamFanart1?: string;
  strLocation?: string;
  intFormedYear?: string;
  strStadiumLocation?: string;
  intStadiumCapacity?: string;
  strWebsite?: string;
  idLeague?: string;
  strLeague?: string;
}

export interface Standing {
  intRank: string;
  idTeam: string;
  strTeam: string;
  strBadge: string;
  intPlayed: string;
  intWin: string;
  intLoss: string;
  intDraw: string;
  intGoalsFor: string;
  intGoalsAgainst: string;
  intGoalDifference: string;
  intPoints: string;
}

export interface Match {
  idEvent: string;
  strEvent: string;
  dateEvent: string;
  strTime: string;
  strHomeTeam: string;
  strAwayTeam: string;
}

interface SportsState {
  leagues: League[];
  teams: Team[];
  selectedTeam: Team | null;
  selectedTeamDetail: Team | null;
  standings: Standing[];
  matches: Match[];
  leaguesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  teamsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  detailStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  matchesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  standingsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SportsState = {
  leagues: [],
  teams: [],
  selectedTeam: null,
  selectedTeamDetail: null,
  standings: [],
  matches: [],
  leaguesStatus: 'idle',
  teamsStatus: 'idle',
  detailStatus: 'idle',
  matchesStatus: 'idle',
  standingsStatus: 'idle',
  error: null,
};

// Async Thunks API Calls
export const fetchLeagues = createAsyncThunk('sports/fetchLeagues', async () => {
  const response = await api.get('/leagues');
  return response.data.data;
});

export const fetchTeams = createAsyncThunk('sports/fetchTeams', async (leagueName: string) => {
  const response = await api.get(`/leagues/${leagueName}/teams`);
  return response.data.data;
});

export const fetchMatches = createAsyncThunk('sports/fetchMatches', async (teamId: string) => {
  const response = await api.get(`/teams/${teamId}/matches`);
  return response.data.data;
});

export const fetchTeamDetail = createAsyncThunk('sports/fetchTeamDetail', async ({ teamId, leagueName }: { teamId: string; leagueName: string }) => {
  const response = await api.get(`/teams/${teamId}?league=${encodeURIComponent(leagueName)}`);
  return response.data.data;
});

export const fetchStandings = createAsyncThunk('sports/fetchStandings', async (leagueId: string) => {
  const response = await api.get(`/leagues/${leagueId}/standings`);
  return response.data.data;
});

const sportsSlice = createSlice({
  name: 'sports',
  initialState,
  reducers: {
    resetTeamDetail: (state) => {
      state.selectedTeamDetail = null;
      state.standings = [];
      state.matches = [];
      state.detailStatus = 'idle';
      state.matchesStatus = 'idle';
      state.standingsStatus = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Leagues
      .addCase(fetchLeagues.pending, (state) => {
        state.leaguesStatus = 'loading';
      })
      .addCase(fetchLeagues.fulfilled, (state, action: PayloadAction<League[]>) => {
        state.leaguesStatus = 'succeeded';
        state.leagues = action.payload;
      })
      .addCase(fetchLeagues.rejected, (state, action) => {
        state.leaguesStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch leagues';
      })
      // Fetch Teams
      .addCase(fetchTeams.pending, (state) => {
        state.teamsStatus = 'loading';
      })
      .addCase(fetchTeams.fulfilled, (state, action: PayloadAction<Team[]>) => {
        state.teamsStatus = 'succeeded';
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.teamsStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch teams';
      })
      // Fetch Matches
      .addCase(fetchMatches.pending, (state) => {
        state.matchesStatus = 'loading';
        state.matches = []; // Clear old matches
      })
      .addCase(fetchMatches.fulfilled, (state, action: PayloadAction<Match[]>) => {
        state.matchesStatus = 'succeeded';
        state.matches = action.payload || [];
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.matchesStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch matches';
      })
      // Fetch Team Detail
      .addCase(fetchTeamDetail.pending, (state) => {
        state.detailStatus = 'loading';
        state.selectedTeamDetail = null; // Clear old team details
      })
      .addCase(fetchTeamDetail.fulfilled, (state, action: PayloadAction<Team>) => {
        state.detailStatus = 'succeeded';
        // Pastikan payload memiliki data yang valid (idTeam ada), jika tidak set null
        if (action.payload && (action.payload as any).idTeam) {
          state.selectedTeamDetail = action.payload;
        } else {
          state.selectedTeamDetail = null;
        }
      })
      .addCase(fetchTeamDetail.rejected, (state, action) => {
        state.detailStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch team details';
      })
      // Fetch Standings
      .addCase(fetchStandings.pending, (state) => {
        state.standingsStatus = 'loading';
        state.standings = []; // Clear old standings
      })
      .addCase(fetchStandings.fulfilled, (state, action: PayloadAction<Standing[]>) => {
        state.standingsStatus = 'succeeded';
        state.standings = action.payload || [];
      })
      .addCase(fetchStandings.rejected, (state, action) => {
        state.standingsStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch standings';
      });
  },
});

export const { resetTeamDetail } = sportsSlice.actions;

export default sportsSlice.reducer;
