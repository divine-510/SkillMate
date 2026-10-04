import { useEffect, useState } from "react";

function Profile() {
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("userId");
  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/profile/${userId}`
      );

      const data = await response.json();

      if (data) {
        setBio(data.bio || "");
        setSkills(data.skills?.join(", ") || "");
      }
    } catch (error) {
      console.log("Could not load profile");
    }
  };

  fetchProfile();
}, [userId]);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/profile/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            bio,
            skills: skills
              .split(",")
              .map((skill) => skill.trim())
              .filter((skill) => skill !== ""),
          }),
        }
      );

      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>SkillMate</h1>

        <h2>My Profile 👤</h2>

        <p className="auth-subtitle">
          Tell others about your skills.
        </p>

        <form onSubmit={handleSave}>

          <textarea
            placeholder="Write something about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="4"
          />

          <input
            type="text"
            placeholder="Skills (Example: Python, Java, Excel)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <button type="submit" className="auth-btn">
            Save Profile
          </button>

        </form>

        {message && <p className="message">{message}</p>}

      </div>
    </div>
  );
}

export default Profile;