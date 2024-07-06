<template>
  <div class="flex flex-col items-center">
    <h1 class="page-header">Leaderboard</h1>
    <table v-if="leaderboard.length && !matchesStore.isLoading && !matchesStore.error" class="w-[90%] text-[#4B5C68]">
      <thead>
        <tr class="h-[40px] bg-[#E4EDF2]">
          <th>Team Name</th>
          <th>MP</th>
          <th class="hidden sm:!table-cell">GF</th>
          <th class="hidden sm:!table-cell">GA</th>
          <th class="table-cell sm:hidden">GD</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(team, index) in leaderboard" :key="index" class="h-[70px]" :class="{ 'bg-[#F6F7F7]': index % 2 }">
          <td class="text-left">
            <div class="flex items-center gap-x-[20px] h-[70px] justify-start text-[16px] font-[700]">
              <img :src="getFlagUrl(team.teamName)" alt="Away Team Flag" class="w-[53px] h-[37px]" />
              <span>{{ team.teamName }}</span>
            </div>
          </td>
          <td class="text-center">{{ team.matchesPlayed }}</td>
          <td class="text-center hidden sm:!table-cell">{{ team.goalsFor }}</td>
          <td class="text-center hidden sm:!table-cell">{{ team.goalsAgainst }}</td>
          <td class="text-center table-cell sm:hidden">{{ team.goalDifference }}</td>
          <td class="text-center text-[#025FEB] font-[700]">{{ team.points }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useMatchesStore } from "../stores/matches";

const matchesStore = useMatchesStore();
const leaderboard = computed(() => matchesStore.leaderBoard || []);

onMounted(async () => {
  if (leaderboard.value.length === 0) {
    await matchesStore.fetchMatches();
  }
});

const formatMatchDateTime = (timestamp) => {
  const date = new Date(timestamp);
  const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  return `${formattedDate} ${formattedTime}`;
};

const getFlagUrl = (teamName) => {
  return `https://flagsapi.codeaid.io/${teamName}.png`;
};
</script>

<style>
/* Add your styles here */
</style>
