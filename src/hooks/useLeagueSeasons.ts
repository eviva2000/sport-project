import { useQuery } from '@tanstack/react-query';

type SeasonData = {
  idSeason: string;
  strSeason: string;
  strBadge: string;
};

type LeagueDetailData = {
  seasons: SeasonData[];
};

const fetchLeagueSeasons = async (leagueId: string): Promise<SeasonData | null> => {
  const response = await fetch(
    `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${leagueId}`
  );
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data: LeagueDetailData = await response.json();
  return data.seasons && data.seasons.length > 0 ? data.seasons[0] : null;
};

export const useLeagueSeasons = (leagueId: string | undefined) => {
  return useQuery({
    queryKey: ['league-seasons', leagueId],
    queryFn: () => fetchLeagueSeasons(leagueId!),
    enabled: !!leagueId,
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000, 
  });
};