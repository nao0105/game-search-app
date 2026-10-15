import { useInfiniteQuery } from '@tanstack/react-query';
import { searchGames } from '../api/rawg';

export default function useSearchGames(query) {
  return useInfiniteQuery({
    queryKey: ['games', query],
    queryFn: ({ pageParam = 1 }) => searchGames(query, pageParam),
    enabled: !!query && query.trim().length > 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !lastPage.next) {
        return undefined;
      }
      return allPages.length + 1;
    },
    staleTime: 1000 * 60 * 5,
  });
}
