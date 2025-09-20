import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useLeagueSeasons } from "../hooks/useLeagueSeasons";

// Styled Components
const PageContainer = styled.div`
  padding: 20px;
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const BackButton = styled.button`
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 12px 18px;
    font-size: 16px;
    width: 100%;
    margin-bottom: 25px;
  }
`;

const ContentContainer = styled.div`
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 15px;
  }
`;

const LeagueTitle = styled.h1`
  margin-bottom: 10px;
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-weight: 700;
  color: #333;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 15px;
  }
`;

const SportText = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 25px;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const BadgeImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  width: auto;
  height: auto;
  object-fit: contain;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background-color: #f9f9f9;
  display: block;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 150px;
    max-height: 150px;
    padding: 8px;
  }

  @media (max-width: 480px) {
    max-width: 150px;
    max-height: 150px;
    padding: 6px;
  }
`;

const NoBadgeContainer = styled.div`
  width: 200px;
  height: 200px;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  color: #666;
  font-size: 14px;
  text-align: center;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
    font-size: 11px;
  }
`;

function League() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const leagueName = searchParams.get("name") || "Unknown League";
  const leagueSport = searchParams.get("sport") || "";

  const { data: firstSeason, isLoading, error } = useLeagueSeasons(id);

  if (isLoading) {
    return <div style={{ padding: "20px" }}>Loading league details...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <p style={{ color: "red" }}>Error: {error.message}</p>
        <button onClick={() => navigate("/home")}>Back to Home</button>
      </div>
    );
  }

  return (
    <PageContainer>
      <BackButton onClick={() => navigate("/home")}>
        ← Back to Leagues
      </BackButton>

      <ContentContainer>
        <LeagueTitle>{leagueName}</LeagueTitle>
        {leagueSport && <SportText>{leagueSport}</SportText>}

        {!firstSeason ? (
          <p>No badge available for this league.</p>
        ) : (
          <BadgeContainer>
            {firstSeason.strBadge ? (
              <BadgeImage
                src={firstSeason.strBadge}
                alt={`${leagueName} badge`}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <NoBadgeContainer>No Badge Available</NoBadgeContainer>
            )}
          </BadgeContainer>
        )}
      </ContentContainer>
    </PageContainer>
  );
}

export default League;
