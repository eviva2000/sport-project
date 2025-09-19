
import React,{useState,useEffect} from 'react';
import { Body, Header,  Table } from './Table.';
import LeagueRow from './LeagueRow';

type LeaguepropsType={
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
}

function LeagueTable () {
const [leaguedData, setLeagueData] = useState<LeaguepropsType[]>([]);
const apiUrl = import.meta.env.VITE_API_URL;
useEffect(() => {
  const fetchLeagueData = async () => {
    try {
      const response = await fetch(apiUrl); 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLeagueData(data);
    } catch (error) {
      console.error("Error fetching league data:", error);
    }
  };

  fetchLeagueData();
}, [apiUrl]);

return  <Table columns=" 1fr 1fr 1fr">
  <Header><div>League</div> <div>Sport</div> <div>LeagueAlternate</div></Header>
  <Body data={leaguedData} render={(league)=><LeagueRow key={league.idLeague}/>}></Body>
</Table>
  
}
export default LeagueTable;