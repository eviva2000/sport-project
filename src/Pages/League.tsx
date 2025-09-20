import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useLeagueSeasons } from "../hooks/useLeagueSeasons";

// Styled Components
const PageContainer = styled.div`
  /* Mobile-first: Start with mobile styles */
  padding: 15px;
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  /* Desktop styles */
  @media (min-width: 769px) {
    padding: 20px;
  }
`;

const BackButton = styled.button`
  /* Mobile-first: Start with mobile styles */
  padding: 12px 18px;
  font-size: 16px;
  width: 100%;
  margin-bottom: 25px;
  background-color: #e41827;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e8394a;
  }

  /* Desktop styles */
  @media (min-width: 769px) {
    padding: 10px 15px;
    font-size: 14px;
    width: auto;
    margin-bottom: 20px;
  }
`;

const ContentContainer = styled.div`
  /* Mobile-first: Start with mobile styles */
  text-align: center;
  max-width: 100%;
  margin: 0 auto;
  padding: 15px;
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  /* Desktop styles */
  @media (min-width: 769px) {
    max-width: 400px;
    padding: 20px;
  }
`;

const LeagueTitle = styled.h1`
  /* Mobile-first: Start with mobile styles */
  font-size: 24px;
  margin-bottom: 15px;
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-weight: 700;
  color: #333;

  /* Desktop styles */
  @media (min-width: 769px) {
    font-size: 32px;
    margin-bottom: 10px;
  }
`;

const SportText = styled.p`
  /* Mobile-first: Start with mobile styles */
  font-size: 16px;
  color: #666;
  margin-bottom: 25px;
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-weight: 400;

  /* Desktop styles */
  @media (min-width: 769px) {
    font-size: 18px;
    margin-bottom: 30px;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const BadgeImage = styled.img`
  /* Mobile-first: Start with mobile styles */
  max-width: 150px;
  max-height: 150px;
  width: auto;
  height: auto;
  object-fit: contain;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  background-color: #f9f9f9;
  display: block;
  margin: 0 auto;

  /* Desktop styles */
  @media (min-width: 769px) {
    max-width: 200px;
    max-height: 200px;
    padding: 10px;
  }
`;

const NoBadgeContainer = styled.div`
  /* Mobile-first: Start with mobile styles */
  width: 150px;
  height: 150px;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #666;
  font-size: 12px;
  text-align: center;

  /* Desktop styles */
  @media (min-width: 769px) {
    width: 200px;
    height: 200px;
    font-size: 14px;
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
    return (
      <div style={{ padding: "20px" }} role="status" aria-live="polite">
        Loading league details...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }} role="alert">
        <p style={{ color: "red" }}>Error: {error.message}</p>
        <button 
          onClick={() => navigate("/home")}
          aria-label="Go back to leagues list"
        >
          Back to Home
        </button>
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
