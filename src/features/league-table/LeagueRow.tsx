import React, { useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import type { LeaguepropsType } from "./LeagueTable";
import { Row } from "./Table.";

// Styled Components
const DesktopView = styled.div`
  display: block;
  font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  @media (max-width: 768px) {
    display: none !important;
  }
`;

const MobileView = styled.div`
  display: none;
  font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  @media (max-width: 768px) {
    display: block !important;
  }
`;

const MobileLeagueName = styled.div`
  margin-bottom: 12px;
  
  strong {
    font-size: 16px;
    color: #333;
    font-weight: 600;
  }
`;

const MobileDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
  flex-wrap: wrap;
  gap: 8px;

  strong {
    font-weight: 500;
  }
`;

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
      {/* Desktop view */}
      <DesktopView>
        <span>{league.strLeague}</span>
      </DesktopView>
      <DesktopView>
        <span>{league.strSport}</span>
      </DesktopView>
      <DesktopView>
        <span>{league.strLeagueAlternate}</span>
      </DesktopView>

      {/* Mobile view */}
      <MobileView>
        <MobileLeagueName>
          <strong>{league.strLeague}</strong>
        </MobileLeagueName>
        <MobileDetails>
          <span><strong>Sport:</strong> {league.strSport}</span>
          {league.strLeagueAlternate && (
            <span><strong>Alt:</strong> {league.strLeagueAlternate}</span>
          )}
        </MobileDetails>
      </MobileView>
    </Row>
  );
}

export default React.memo(LeagueRow);
