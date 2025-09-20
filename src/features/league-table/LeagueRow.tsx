import type { LeaguepropsType } from "./LeagueTable";
import { Row } from "./Table.";

type LeagueRowProps = {
    league: LeaguepropsType;
    key: string;
}

function LeagueRow({league,key}:LeagueRowProps) {
  return <Row key={key}><div>{league.strLeague}</div> <div>{league.strSport}</div> <div>{league.strLeagueAlternate}</div></Row>;
}
export default LeagueRow;