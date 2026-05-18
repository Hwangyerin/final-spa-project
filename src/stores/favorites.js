import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useFavoritesStore = defineStore('favorites', () => {
  // 1. 변수 이름을 아래에서 사용하는 'favoriteMovies'로 통일했습니다.
  const savedFavorites = JSON.parse(localStorage.getItem('favorite_movies')) || [];
  const favoriteMovies = ref(savedFavorites);

  // 찜 개수 계산
  const totalFavorites = computed(() => favoriteMovies.value.length);

  // 평균 평점 계산
  const averageRating = computed(() => {
    if (favoriteMovies.value.length === 0) return 0;
    const sum = favoriteMovies.value.reduce((acc, movie) => acc + (movie.rating || 0), 0);
    return (sum / favoriteMovies.value.length).toFixed(1);
  });

  // 토글 기능 (스토어 내부로 이동)
  const toggleFavorite = (movie) => {
    const index = favoriteMovies.value.findIndex((m) => m.id === movie.id);
    if (index === -1) {
      favoriteMovies.value.push(movie);
    } else {
      favoriteMovies.value.splice(index, 1);
    }
  };

  // 전체 삭제 기능 (스토어 내부로 이동)
  const clearAllFavorites = () => {
    favoriteMovies.value = [];
  };

  // 로컬 스토리지 감시 (스토어 내부로 이동)
  watch(
    favoriteMovies,
    (newVal) => {
      localStorage.setItem('favorite_movies', JSON.stringify(newVal));
    },
    { deep: true }
  );

  // 2. 이 모든 상태와 함수들을 한 번에 return 해줍니다.
  return { 
    favoriteMovies, 
    totalFavorites, 
    averageRating, 
    toggleFavorite, 
    clearAllFavorites
  };
}); // <- 스토어 정의를 닫는 중괄호가 가장 마지막으로 이동했습니다!