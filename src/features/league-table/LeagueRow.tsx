import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { LeaguepropsType } from "./LeagueTable";
import { Row } from "./Table.";

type LeagueRowProps = {
  league: LeaguepropsType;
  key: string;
};

function LeagueRow({ league, key }: LeagueRowProps) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(
      `/league/${league.idLeague}?name=${encodeURIComponent(
        league.strLeague
      )}&sport=${encodeURIComponent(league.strSport)}`
    );
  }, [navigate, league.idLeague, league.strLeague, league.strSport]);

  return (
    <Row key={key} onClick={handleClick} style={{ cursor: "pointer" }}>
      <div>{league.strLeague}</div>
      <div>{league.strSport}</div>
      <div>{league.strLeagueAlternate}</div>
    </Row>
  );
}

export default React.memo(LeagueRow);
