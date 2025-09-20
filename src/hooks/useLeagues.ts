import { useQuery } from '@tanstack/react-query';
import type { LeaguepropsType } from '../features/league-table/LeagueTable';

type LeaguesResponse = {
  leagues: LeaguepropsType[];
};

const fetchLeagues = async (): Promise<LeaguepropsType[]> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(apiUrl);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data: LeaguesResponse = await response.json();
  return data.leagues || [];
};

export const useLeagues = () => {
  return useQuery({
    queryKey: ['leagues'],
    queryFn: fetchLeagues,
    staleTime: 10 * 60 * 1000, 
    gcTime: 30 * 60 * 1000, 
  });
};