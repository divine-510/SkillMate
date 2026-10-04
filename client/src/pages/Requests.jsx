import { useEffect, useState } from "react";

function Requests() {
  const [requests, setRequests] = useState([]);

  const userId = localStorage.getItem("userId");

  const fetchRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/requests/received/${userId}`
      );

      const data = await response.json();

      setRequests(data);
    } catch (error) {
      console.log("Could not load requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="skills-page">
      <div className="skills-container">

        <h1>Learning Requests 🤝</h1>

        <p className="skills-subtitle">
          Manage your incoming learning requests.
        </p>

        {requests.length === 0 ? (
          <p>No learning requests yet.</p>
        ) : (
          <div className="skills-list">

            {requests.map((request) => (
              <div className="skill-card" key={request._id}>

                <h3>📚 {request.skillId?.name}</h3>

                <p>
                  <strong>{request.senderId?.name}</strong> wants to
                  learn this skill from you.
                </p>

                <small>
                  Status: {request.status}
                </small>

                {request.status === "pending" && (
                  <div style={{ marginTop: "15px" }}>

                    <button
  className="auth-btn"
  onClick={async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/requests/${request._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "accepted",
          }),
        }
      );

      const data = await response.json();

      alert(data.message);
      fetchRequests();
    } catch (error) {
      alert("Could not accept request");
    }
  }}
>
  ✅ Accept
</button>

                    <button
  className="auth-btn"
  style={{ marginTop: "10px" }}
  onClick={async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/requests/${request._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "rejected",
          }),
        }
      );

      const data = await response.json();

      alert(data.message);
      fetchRequests();
    } catch (error) {
      alert("Could not reject request");
    }
  }}
>
  ❌ Reject
</button>

                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default Requests;