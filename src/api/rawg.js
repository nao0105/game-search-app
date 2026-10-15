import axios from 'axios';

const RAWG_API_KEY = process.env.EXPO_PUBLIC_RAWG_API_KEY;

if (!RAWG_API_KEY) {
  console.warn('RAWG API キーが設定されていません。 .env を確認してください。');
}

const rawgApi = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: RAWG_API_KEY,
  },
});

export const searchGames = async (query, page = 1, pageSize = 20) => {
  if (!query || !query.trim()) {
    return { results: [], next: null };
  }

  const response = await rawgApi.get('/games', {
    params: {
      search: query.trim(),
      page,
      page_size: pageSize,
    },
  });

  return response.data;
};

export const getGameDetail = async (gameId) => {
  const response = await rawgApi.get(`/games/${gameId}`);
  return response.data;
};
