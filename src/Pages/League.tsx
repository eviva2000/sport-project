import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useLeagueSeasons } from "../hooks/useLeagueSeasons";

function League() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const leagueName = searchParams.get('name') || 'Unknown League';
  const leagueSport = searchParams.get('sport') || '';
  
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
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => navigate("/home")}
        style={{
          marginBottom: "20px",
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        ← Back to Leagues
      </button>

      <div style={{ 
        textAlign: 'center', 
        maxWidth: '400px', 
        margin: '0 auto',
        padding: '20px'
      }}>
        <h1 style={{ marginBottom: '10px' }}>{leagueName}</h1>
        {leagueSport && (
          <p style={{ 
            fontSize: '18px', 
            color: '#666', 
            marginBottom: '30px' 
          }}>
            {leagueSport}
          </p>
        )}
        
        {!firstSeason ? (
          <p>No badge available for this league.</p>
        ) : (
          <div>
            {firstSeason.strBadge ? (
              <img 
                src={firstSeason.strBadge} 
                alt={`${leagueName} badge`}
                style={{
                  maxWidth: '200px',
                  maxHeight: '200px',
                  objectFit: 'contain',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#f9f9f9'
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div style={{ 
                width: '200px', 
                height: '200px', 
                backgroundColor: '#eee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}>
                No Badge Available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default League;
