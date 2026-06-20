<script setup>
import { computed, ref } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useMovieStore } from './stores/movieStore';

const router = useRouter();
const searchInput = ref('');

const goToSearch = () => {
  const query = searchInput.value.trim();
  if (query) {
    router.push({ name: 'search', query: { q: query } });
    searchInput.value = '';
  }
};

const store = useMovieStore();

const totalFavoritesCount = computed(() => {
  return store.favorites.length;
});

const averageFavoritesRating = computed(() => {
  if (store.favorites.length === 0) {
    return '0.0';
  }
  const totalRatingSum = store.favorites.reduce((accumulator, movie) => {
    return accumulator + movie.vote_average;
  }, 0);
  const calculatedAverage = totalRatingSum / store.favorites.length;
  return calculatedAverage.toFixed(1);
});
</script>

<template>
  <div class="app-container">
    <header class="main-header">
      <div class="header-content">
        <RouterLink to="/" class="logo-zone">
          <span class="logo-icon">🎬</span>
          <h1 class="logo-text">NETVUE</h1>
        </RouterLink>
        <nav class="nav-menu">
          <RouterLink to="/" class="nav-item">홈</RouterLink>
          <RouterLink to="/movies" class="nav-item">영화 목록</RouterLink>
        </nav>
        <form class="search-form" @submit.prevent="goToSearch">
          <input
            v-model="searchInput"
            type="text"
            class="search-input"
            placeholder="영화 제목 검색..."
          />
          <button type="submit" class="search-btn" :class="{ inactive: !searchInput }">🔍</button>
        </form>
        <div class="header-dashboard">
          <RouterLink to="/favorites" class="dashboard-badge favorite-count">
            <span class="badge-label">❤️ 찜한 작품</span>
            <span class="badge-value">{{ totalFavoritesCount }}</span>
          </RouterLink>
          <div class="dashboard-badge average-rating">
            <span class="badge-label">⭐ 평균 평점</span>
            <span class="badge-value">{{ averageFavoritesRating }}</span>
          </div>
        </div>
      </div>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container { font-family: "Noto Sans KR", sans-serif; background-color: #f8f9fa; min-height: 100vh; display: flex; flex-direction: column; }
.main-header { background-color: #1e272e; color: #ffffff; position: sticky; top: 0; z-index: 1000; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); padding: 0 40px;}
.header-content { max-width: 1200px; margin: 0 auto; height: 80px; display: flex; align-items: center; justify-content: space-between;}
.logo-zone { display: flex; align-items: center; gap: 10px; text-decoration: none; color: #fff;}
.logo-icon { font-size: 28px;}
.logo-text { font-size: 22px; font-weight: 900; letter-spacing: -0.5px; background: linear-gradient(45deg, #ff4757, #ff6b81);
-webkit-background-clip: text; -webkit-text-fill-color: transparent;}
.nav-menu { display: flex; gap: 30px;}
.nav-item { color: #ced5e0; text-decoration: none; font-size: 16px; font-weight: 700; transition: color 0.2s ease; padding: 8px 12px; border-radius: 6px;}
.nav-item:hover {color: #fff; background-color: rgba(255, 255, 255, 0.05);}
.router-link-active.nav-item { color: #ff4757; background-color: rgba(255, 87, 87, 0.1);}
.header-dashboard { display: flex; gap:15px;}
.dashboard-badge { background-color: #2f3542; padding: 10px 16px; border-radius: 30px; display: flex; align-items: center;
gap: 8px; border: 1px solid #3f4656; text-decoration: none;}
.favorite-count:hover { border-color: #ff4757; background-color: rgba(255, 71, 87, 0.15);}
.badge-label { font-size: 13px; color: #a4b0be; font-weight: 500;}
.badge-value { font-size: 14px; font-weight: 800; color: #fff;}
.average-rating .badge-value { color: #f1b12c; }
.main-content { flex-grow: 1; width: 100%; box-sizing: border-box; }
.search-form { display: flex; align-items: center; gap: 6px;}
.search-input { padding: 8px 14px; border-radius: 20px; border: 1px solid #3f4656; background-color: #2f3542;
color: #fff; font-size: 14px; width: 180px; outline: none; transition: 0.2s;}
.search-input::placeholder { color: #a4b0be;}
.search-input:focus { border-color: #ff4757; width: 220px;}
.search-btn { background: #ff4757; border: none; color: white; padding: 8px 12px; border-radius: 20px;
cursor: pointer; font-size: 14px; transition: 0.2s;}
.search-btn:hover { background: #ff6b81;}
.search-btn.inactive { background: #3f4656; color: #a4b0be; cursor: default;}
.search-btn.inactive:hover { background: #3f4656;}
</style>