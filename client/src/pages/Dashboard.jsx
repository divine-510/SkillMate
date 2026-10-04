import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Dashboard() {
  const [data, setData] = useState(null);

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          `https://skillmate-lixb.onrender.com/api/dashboard/${userId}`
        );

        const result = await response.json();

        setData(result);
      } catch (error) {
        console.log("Could not load dashboard");
      }
    };

    fetchDashboard();
  }, [userId]);

  if (!data) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="skills-page">

      <div className="skills-container">

        <h1>Welcome, {localStorage.getItem("userName")} 👋</h1>
        <p className="skills-subtitle">
          Track your SkillMate activity.
        </p>
        <div style={{ marginBottom: "30px", textAlign: "center" }}>
  <Link to="/skills">
    <button className="auth-btn" style={{ margin: "5px" }}>
      📚 Skills
    </button>
  </Link>

  <Link to="/requests">
    <button className="auth-btn" style={{ margin: "5px" }}>
      🤝 Requests
    </button>
  </Link>

  <Link to="/reviews">
    <button className="auth-btn" style={{ margin: "5px" }}>
      ⭐ Reviews
    </button>
  </Link>

  <Link to="/profile">
    <button className="auth-btn" style={{ margin: "5px" }}>
      👤 Profile
    </button>
  </Link>
  <button
  className="auth-btn"
  style={{ margin: "5px" }}
  onClick={() => {
    localStorage.clear();
    window.location.href = "/";
  }}
>
  🚪 Logout
</button>
</div>

        <div className="skills-list">

          <div className="skill-card">
            <h3>📚 My Skills</h3>
            <p>{data.totalSkills}</p>
          </div>

          <div className="skill-card">
            <h3>🤝 Requests Received</h3>
            <p>{data.totalRequests}</p>
          </div>

          <div className="skill-card">
            <h3>✅ Accepted Requests</h3>
            <p>{data.acceptedRequests}</p>
          </div>

          <div className="skill-card">
            <h3>⭐ Average Rating</h3>
            <p>{data.averageRating}/5</p>
          </div>

        </div>
        <div className="activity-card">

  <h2>🕒 Recent Activity</h2>

  {data.totalSkills > 0 && (
    <div className="activity-item">
      <span>📚</span>
      <p>You added a skill to SkillMate.</p>
    </div>
  )}

  {data.totalRequests > 0 && (
    <div className="activity-item">
      <span>🤝</span>
      <p>You received a learning request.</p>
    </div>
  )}

  {data.averageRating > 0 && (
    <div className="activity-item">
      <span>⭐</span>
      <p>You received a review from a student.</p>
    </div>
  )}

  {data.totalSkills === 0 &&
   data.totalRequests === 0 &&
   data.averageRating === 0 && (
    <p className="no-activity">
      No recent activity yet. Start by adding a skill! 🚀
    </p>
  )}

</div>

      </div>

    </div>
  );
}

export default Dashboard;