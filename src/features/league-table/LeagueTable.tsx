import React, { useState, useMemo } from "react";
import { Body, Header, Table } from "./Table.";
import LeagueRow from "./LeagueRow";
import { useLeagues } from "../../hooks/useLeagues";

export type LeaguepropsType = {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
};

function LeagueTable() {
  const { data: leaguesData = [], isLoading, error } = useLeagues();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("");

  // Memoize available sports to avoid recalculation
  const availableSports = useMemo(() => {
    if (!leaguesData.length) return [];
    const sports = [...new Set(leaguesData.map(league => league.strSport))] as string[];
    return sports.sort();
  }, [leaguesData]);

  // Memoize filtered leagues for better performance
  const filteredLeagues = useMemo(() => {
    let filtered = leaguesData;

    if (searchTerm) {
      filtered = filtered.filter((league) =>
        league.strLeague.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSport) {
      filtered = filtered.filter((league) => league.strSport === selectedSport);
    }

    return filtered;
  }, [leaguesData, searchTerm, selectedSport]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSport(event.target.value);
  };

  if (isLoading) {
    return <div>Loading leagues...</div>;
  }

  if (error) {
    return <div>Error loading leagues: {error.message}</div>;
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
