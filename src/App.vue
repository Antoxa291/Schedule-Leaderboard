<template>
  <div class="flex flex-col font-sans h-[100vh]">
    <nav class="main-nav">
      <router-link to="/" class="w-[110px] grow">
        <img src="/images/logo.svg" alt="" srcset="" />
      </router-link>
      <router-link to="/schedule" class="flex items-center gap-[10px]"
        ><img src="/images/schedule.png" class="h-[25px]" height="25" alt="" srcset="" />Schedule</router-link
      >
      <router-link to="/leaderboard" class="flex items-center gap-[10px]"
        ><img src="/images/leaderboard.png" class="h-[25px]" height="25" alt="" srcset="" />Leaderboard</router-link
      >
    </nav>
    <main class="grow">
      <router-view></router-view>
    </main>
    <footer class="w-full h-[40px] bg-[#F6F7F7] flex justify-end items-center">
      <p class="pr-[40px] text-[#4B5C68]">API Version: 1.0</p>
    </footer>
  </div>
</template>

<script setup></script>

<style>
@import "./assets/output.css";
</style>
