<script setup>
import { useFavoritesStore } from '@/stores/favorites';
const favoriteStore = useFavoritesStore();

</script>


<template>
  <div class="app-container">
    <header class="navbar">
      <div class="logo">🍿 SPA Movie</div>
      <nav clas="links">
        <router-link to="/">Home</router-link>
        <router-link to="/movies">Movies</router-link>
        <div class="favorite-stats">
          <span class="badge count-badge">❤️ 찜: {{ favoriteStore.totalFavorites }}개</span>
          <span v-if="favoriteStore.averageRating > 0" class="badge rating-badge">
            ⭐ 평균 평점: {{ favoriteStore.averageRating }}
          </span>
        </div>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<style scoped>
  .app-container { font-family: sans-serif; }
  .navbar { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; background-color: #2c3e50; color: white; }
  .logo { font-size: 24px; font-weight: bold;}
  .links { display: flex; gap: 20px; align-items:center; }
  .links a { color: #a1b1c1; text-decoration: none; font-weight: bold; font-size: 18px;}
  .links a.router-link-active { color: #42b883; text-decoration: underline;}
  .favorite-stats { display: flex; gap: 10px; margin-left: 20px;}
  .badge { padding: 6px 12px; border-radius: 20px; font-weight: bolde; font-size: 14px;}
  .count-badge { background-color: #ff4757; color: white;}
  .rating-badge { background-color: #f1c40f; color: #333;}
</style>