
import React,{useState,useEffect} from 'react';
import { Body, Header,  Table } from './Table.';
import LeagueRow from './LeagueRow';

export type LeaguepropsType={
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
}

function LeagueTable () {
const [leaguesData, setLeaguesData] = useState<LeaguepropsType[]>([]);
const apiUrl = import.meta.env.VITE_API_URL;
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchLeagueData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLeaguesData(data.leagues);
    } catch (error) {
      console.error("Error fetching league data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  fetchLeagueData();
}, [apiUrl]);

if (loading) {
  // Render a loading indicator while data is being fetched
  return <div>Loading...</div>;
}


return  <Table columns=" 1fr 1fr 1fr">
  <Header><div>League</div> <div>Sport</div> <div>LeagueAlternate</div></Header>
  <Body data={leaguesData} render={(league)=><LeagueRow league={league} key={league.idLeague}/>}></Body>
</Table>
  
}
export default LeagueTable;