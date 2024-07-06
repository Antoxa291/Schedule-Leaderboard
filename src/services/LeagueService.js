/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 * 
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM, 
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.  
 * 
 *       ADDITIONALLY, MAKE SURE THAT ALL LIBRARIES USED IN THIS FILE FILE ARE COMPATIBLE WITH PURE JAVASCRIPT
 * 
 */
class LeagueService {
    constructor() {
        this.matches = [];
    }

    /**
     * Sets the match schedule.
     * @param {Array} matches List of matches.
     */
    setMatches(matches) {
        this.matches = matches;
    }

    /**
     * Returns the full list of matches.
     * @returns {Array} List of matches.
     */
    getMatches() {
        return this.matches;
    }

    /**
     * Returns the leaderboard in a form of a list of JSON objects.
     * @returns {Array} List of teams representing the leaderboard.
     */
    getLeaderboard() {
        const leaderboard = {};

        this.matches.forEach(match => {
            if (!match.matchPlayed) return;

            const { homeTeam, awayTeam, homeTeamScore, awayTeamScore } = match;

            // Initialize teams if not present in leaderboard
            if (!leaderboard[homeTeam]) {
                leaderboard[homeTeam] = { teamName: homeTeam, matchesPlayed: 0, goalsFor: 0, goalsAgainst: 0, points: 0 };
            }
            if (!leaderboard[awayTeam]) {
                leaderboard[awayTeam] = { teamName: awayTeam, matchesPlayed: 0, goalsFor: 0, goalsAgainst: 0, points: 0 };
            }

            // Update matches played
            leaderboard[homeTeam].matchesPlayed += 1;
            leaderboard[awayTeam].matchesPlayed += 1;

            // Update goals for and against
            leaderboard[homeTeam].goalsFor += homeTeamScore;
            leaderboard[homeTeam].goalsAgainst += awayTeamScore;
            leaderboard[awayTeam].goalsFor += awayTeamScore;
            leaderboard[awayTeam].goalsAgainst += homeTeamScore;

            // Update points
            if (homeTeamScore > awayTeamScore) {
                leaderboard[homeTeam].points += 3;
            } else if (homeTeamScore < awayTeamScore) {
                leaderboard[awayTeam].points += 3;
            } else {
                leaderboard[homeTeam].points += 1;
                leaderboard[awayTeam].points += 1;
            }
        });

        return Object.values(leaderboard);
    }

    /**
     * Asynchronic function to fetch the data from the server and set the matches.
     */
    async fetchData() {
        try {
            // Fetch the access token
            let response = await fetch('http://localhost:3001/api/v1/getAccessToken');
            let data = await response.json();
            if (!data.success) {
                throw new Error('Failed to retrieve access token');
            }
            const token = data.access_token;

            // Fetch the matches
            response = await fetch('http://localhost:3001/api/v1/getAllMatches', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            data = await response.json();
            if (!data.success) {
                throw new Error('Failed to retrieve matches');
            }

            // Set the matches
            this.setMatches(data.matches);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    /**
     * Generates the leaderboard based on the matches played.
     * @returns {Array} List of teams representing the leaderboard.
     */
    generateLeaderboard() {
        const leaderboard = {};

        // Iterate through matches to calculate points, goals, etc.
        this.matches.forEach(match => {
            if (!match.matchPlayed) return;

            const { homeTeam, awayTeam, homeTeamScore, awayTeamScore } = match;

            // Initialize teams if not present in leaderboard
            if (!leaderboard[homeTeam]) {
                leaderboard[homeTeam] = { teamName: homeTeam, matchesPlayed: 0, goalsFor: 0, goalsAgainst: 0, points: 0 };
            }
            if (!leaderboard[awayTeam]) {
                leaderboard[awayTeam] = { teamName: awayTeam, matchesPlayed: 0, goalsFor: 0, goalsAgainst: 0, points: 0 };
            }

            // Update matches played
            leaderboard[homeTeam].matchesPlayed += 1;
            leaderboard[awayTeam].matchesPlayed += 1;

            // Update goals for and against
            leaderboard[homeTeam].goalsFor += homeTeamScore;
            leaderboard[homeTeam].goalsAgainst += awayTeamScore;
            leaderboard[awayTeam].goalsFor += awayTeamScore;
            leaderboard[awayTeam].goalsAgainst += homeTeamScore;

            // Update points
            if (homeTeamScore > awayTeamScore) {
                leaderboard[homeTeam].points += 3;
            } else if (homeTeamScore < awayTeamScore) {
                leaderboard[awayTeam].points += 3;
            } else {
                leaderboard[homeTeam].points += 1;
                leaderboard[awayTeam].points += 1;
            }
        });

        // Calculate Goal Difference (GD) and add to leaderboard
        Object.values(leaderboard).forEach(team => {
            team.goalDifference = team.goalsFor - team.goalsAgainst;
        });

        // Convert leaderboard object to array and sort
        const sortedLeaderboard = Object.values(leaderboard).sort((a, b) => {
            // Sort by points descending
            if (b.points !== a.points) {
                return b.points - a.points;
            }

            // First tiebreaker: head-to-head points
            // Assuming head-to-head logic implementation here
            // Example: if (a.teamName === 'TeamA' && b.teamName === 'TeamB') { ... }

            // Second tiebreaker: goal difference
            if (b.goalDifference !== a.goalDifference) {
                return b.goalDifference - a.goalDifference;
            }

            // Third tiebreaker: scored goals
            if (b.goalsFor !== a.goalsFor) {
                return b.goalsFor - a.goalsFor;
            }

            // Final tiebreaker: alphabetic order by team name
            return a.teamName.localeCompare(b.teamName);
        });

        return sortedLeaderboard;
    }
}

export default LeagueService;