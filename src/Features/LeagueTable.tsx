
import React,{useState,useEffect} from 'react';

function LeagueTable () {
const [leaguedData, setLeagueData] = useState([]);
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

  return <div></div>;
}
export default LeagueTable;