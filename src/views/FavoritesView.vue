<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { useMovieStore } from '../stores/movieStore';

const store = useMovieStore();
const currentPage = ref(1);
const MOVIES_PER_PAGE = 8;

const totalPages = computed(() => Math.ceil(store.favorites.length / MOVIES_PER_PAGE));

const paginatedFavorites = computed(() => {
  const start = (currentPage.value - 1) * MOVIES_PER_PAGE;
  return store.favorites.slice(start, start + MOVIES_PER_PAGE);
});

watch(
  () => store.favorites.length,
  () => {
    if (currentPage.value > totalPages.value) {
      currentPage.value = Math.max(1, totalPages.value);
    }
  }
);

onMounted(() => {
  document.title = '찜 목록';
});
</script>

<template>
  <main class="page">
    <div class="header-section">
      <h1>찜 목록</h1>
      <p class="sub-title">내가 찜한 영화 {{ store.favorites.length }}편</p>
    </div>

    <div v-if="store.favorites.length === 0" class="status-message empty">
      아직 찜한 영화가 없습니다. 영화 목록에서 마음에 드는 작품을 찾아보세요!
    </div>

    <div v-else>
      <div class="movie-list">
        <div v-for="movie in paginatedFavorites" :key="movie.id" class="movie-card">
          <RouterLink :to="`/movies/${movie.id}`" class="stretched-link" :aria-label="movie.title"></RouterLink>
          <img
            v-if="movie.poster_path"
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
            class="poster"
          />
          <div v-else class="poster-placeholder">이미지 준비 중</div>
          <div class="card-content">
            <h3 class="title">{{ movie.title }}</h3>
            <p class="release-date" v-if="movie.release_date">🗓️ 개봉일: {{ movie.release_date }}</p>
            <p class="rating">⭐ {{ movie.vote_average.toFixed(1) }} / 10</p>
            <p class="overview">
              {{ movie.overview ? movie.overview.substring(0, 60) + '...' : '국내에 등록된 줄거리 요약 정보가 없습니다.' }}
            </p>
            <button
              @click="store.toggleFavorite(movie.id)"
              class="fav-btn active"
            >♥ 찜 해제</button>
          </div>
        </div>
      </div>
      <div class="pagination" v-if="totalPages > 1">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="{ active: currentPage === page }"
          class="page-btn"
        >{{ page }}</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.page { padding: 40px; background-color: #f8f9fa; min-height: 100vh;}
.header-section { margin-bottom: 30px; text-align: center; color: #2c3e50;}
.sub-title { font-size: 14px; color: #7f8c8d; margin-top: 5px;}
.status-message { text-align: center; font-size: 18px; font-weight: bold; padding: 60px 40px; border-radius: 12px;}
.empty { color: #7f8c8d; background-color: #ecf0f1;}
.movie-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 30px;}
.movie-card { position: relative; border-radius: 12px; overflow: hidden; background: white; text-align: left;
box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: transform 0.2s ease; display: flex; flex-direction: column;}
.movie-card:hover { transform: translateY(-5px);}
.poster { width: 100%; height: 380px; object-fit: cover;}
.poster-placeholder { width: 100%; height: 380px; background-color: #ddd; display: flex; align-items: center;
justify-content: center; color: #7f8c8d; font-weight: bold;}
.card-content { padding: 20px; display: flex; flex-direction: column; flex-grow: 1;}
.title { font-size: 19px; color: #333; margin: 0 0 6px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: bold;}
.release-date { font-size: 13px; color: #7f8c8d; margin-bottom: 10px; font-weight: 500;}
.rating { font-weight: bold; color: #f39c12; margin-bottom: 10px; font-size: 16px;}
.overview { font-size: 13px; color: #555; line-height: 1.4; margin-bottom: 20px; flex-grow: 1;}
.fav-btn { position: relative; z-index: 2; width: 100%; padding: 12px; cursor: pointer; border: none; background: #ecf0f1; color: #333;
border-radius: 8px; font-weight: bold; font-size: 14px; transition: 0.3s; margin-top: auto;}
.fav-btn.active { background: #ff4757; color: white;}
.fav-btn.active:hover { background: #c0392b;}
.stretched-link { position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1;}
.pagination { display: flex; justify-content: center; gap: 8px; margin-top: 40px; flex-wrap: wrap;}
.page-btn { width: 40px; height: 40px; border: 2px solid #bdc3c7; background: white; color: #555; border-radius: 50%;
font-size: 14px; font-weight: bold; cursor: pointer; transition: 0.2s;}
.page-btn:hover { border-color: #ff4757; color: #ff4757;}
.page-btn.active { background: #ff4757; color: white; border-color: #ff4757;}
</style>
