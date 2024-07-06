<template>
  <div class="flex flex-col items-center">
    <h1 class="page-header">League Schedule</h1>
    <table v-if="matches.length && !matchesStore.isLoading && !matchesStore.error" class="w-[90%] text-[#4B5C68]">
      <thead>
        <tr class="h-[40px] bg-[#E4EDF2]">
          <th class="w-[80px] text-right text-[14px]">Date/Time</th>
          <th class="hidden sm:!table-cell pl-[100px] text-left text-[14px]">Stadium</th>
          <th class="text-right text-[16px]">Home Team</th>
          <th></th>
          <th class="text-left text-[16px]">Away Team</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(match, index) in matches" :key="index" class="h-[70px]" :class="{ 'bg-[#F6F7F7]': index % 2 }">
          <td class="w-[80px] text-right text-[14px] h-[70px]">{{ formatMatchDateTime(match.matchDate) }}</td>
          <td class="hidden sm:!table-cell pl-[100px] text-left text-[14px] h-[70px]">{{ match.stadium }}</td>
          <td>
            <div class="flex items-center gap-x-[20px] h-[70px] justify-end text-[16px] font-[700]">
              <span>{{ match.homeTeam }}</span>
              <img :src="getFlagUrl(match.homeTeam)" alt="Home Team Flag" class="w-[53px] h-[37px]" />
            </div>
          </td>
          <td class="text-[16px] font-[700] h-[70px] text-center" v-if="match.matchPlayed">
            {{ match.homeTeamScore }} - {{ match.awayTeamScore }}
          </td>
          <td v-else class="h-[70px] text-center">- : -</td>
          <td>
            <div class="flex items-center gap-x-[20px] h-[70px] justify-start text-[16px] font-[700]">
              <img :src="getFlagUrl(match.awayTeam)" alt="Away Team Flag" class="w-[53px] h-[37px]" />
              <span>{{ match.awayTeam }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useMatchesStore } from "../stores/matches";

const matchesStore = useMatchesStore();
const matches = computed(() => matchesStore.matches || []);

onMounted(async () => {
  if (matches.value.length === 0) {
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

<style scoped></style>
