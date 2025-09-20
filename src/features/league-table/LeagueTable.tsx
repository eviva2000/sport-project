import React, { useState, useEffect } from "react";
import { Body, Header, Table } from "./Table.";
import LeagueRow from "./LeagueRow";

export type LeaguepropsType = {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
};

function LeagueTable() {
  const [leaguesData, setLeaguesData] = useState<LeaguepropsType[]>([]);
  const [filteredLeagues, setFilteredLeagues] = useState<LeaguepropsType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [availableSports, setAvailableSports] = useState<string[]>([]);
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
        setFilteredLeagues(data.leagues);

        const sports = [
          ...new Set(
            data.leagues.map((league: LeaguepropsType) => league.strSport)
          ),
        ] as string[];
        setAvailableSports(sports.sort());
      } catch (error) {
        console.error("Error fetching league data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchLeagueData();
  }, [apiUrl]);

  // Filter leagues based on search term and sport type
  useEffect(() => {
    let filtered = leaguesData;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((league) =>
        league.strLeague.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by sport type
    if (selectedSport) {
      filtered = filtered.filter((league) => league.strSport === selectedSport);
    }

    setFilteredLeagues(filtered);
  }, [searchTerm, selectedSport, leaguesData]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSport(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Search leagues..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "300px",
            }}
          />
          <select
            value={selectedSport}
            onChange={handleSportChange}
            style={{
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              minWidth: "150px",
            }}
          >
            <option value="">All Sports</option>
            {availableSports.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>
        {(searchTerm || selectedSport) && (
          <p style={{ marginTop: "10px", color: "#666" }}>
            Found {filteredLeagues.length} league
            {filteredLeagues.length !== 1 ? "s" : ""}
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedSport && ` in ${selectedSport}`}
          </p>
        )}
      </div>
      <Table columns=" 1fr 1fr 1fr">
        <Header>
          <div>League</div> <div>Sport</div> <div>LeagueAlternate</div>
        </Header>
        <Body
          data={filteredLeagues}
          render={(league) => (
            <LeagueRow league={league} key={league.idLeague} />
          )}
        ></Body>
      </Table>
    </div>
  );
}
export default LeagueTable;
