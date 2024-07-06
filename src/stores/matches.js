import { defineStore } from 'pinia';
import LeagueService from '../services/LeagueService';

export const useMatchesStore = defineStore('matches', {
  state: () => ({
    matches: [],
    leaderBoard: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchMatches() {
      this.isLoading = true;
      this.error = null;
      const leagueService = new LeagueService();

      try {
        await leagueService.fetchData();
        this.matches = leagueService.getMatches();
        this.leaderBoard = leagueService.generateLeaderboard();
      } catch (error) {
        this.error = 'Failed to fetch matches';
        console.error('Failed to fetch matches:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
