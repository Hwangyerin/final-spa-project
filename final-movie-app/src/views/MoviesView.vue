<script setup>
  import { ref } from 'vue';

  const movies = ref([
    { id: 1, title: '인셉션', rating: 9.0 },
    { id: 2, title: '인터스텔라', rating: 9.5 },
  ])
</script>

<template>
  <main class="page">
    <h1>🎬 영화 목록</h1>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        {{ movie.title }} (✨ {{ movie.rating }})
      </li>
    </ul>
  </main>
</template>

<style scoped>
  .page { padding: 40px;}
  ul { list-style: none; padding: 0; }
  li { padding: 10px; border-bottom: 1px solid #ddd; font-size: 18px;}
</style>