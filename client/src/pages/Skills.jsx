import { useEffect, useState } from "react";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("userId");

  const fetchSkills = async () => {
    try {
      const response = await fetch("https://skillmate-lixb.onrender.com/api/skills");
      const data = await response.json();

      setSkills(data);
    } catch (error) {
      setMessage("Could not load skills");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddSkill = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://skillmate-lixb.onrender.com/api/skills/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            userId,
          }),
        }
      );

      const data = await response.json();

      setMessage(data.message);

      if (response.ok) {
        setName("");
        setDescription("");
        fetchSkills();
      }
    } catch (error) {
      setMessage("Could not add skill");
    }
  };

  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="skills-page">

      <div className="skills-container">

        <h1>SkillMate 📚</h1>

        <p className="skills-subtitle">
          Discover skills and share what you know.
        </p>

        <div className="add-skill-card">

          <h2>Add Your Skill</h2>

          <form onSubmit={handleAddSkill}>

            <input
              type="text"
              placeholder="Skill name (Example: Python)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit" className="auth-btn">
              Add Skill
            </button>

          </form>

          {message && <p className="message">{message}</p>}

        </div>

        <div className="search-box">

          <input
            type="text"
            placeholder="🔍 Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="skills-list">

          {filteredSkills.length === 0 ? (
            <p>No skills found.</p>
          ) : (
            filteredSkills.map((skill) => (
              <div className="skill-card" key={skill._id}>

                <h3>📚 {skill.name}</h3>

                <p>{skill.description}</p>

                <small>
                  Shared by: {skill.userId?.name || "Student"}
                </small>
                {skill.userId?._id === userId && (
  <button
    className="auth-btn"
    style={{ marginTop: "10px" }}
    onClick={async () => {
      const newDescription = prompt(
        "Enter new description:",
        skill.description
      );

      if (newDescription === null) return;

      try {
        const response = await fetch(
          `https://skillmate-lixb.onrender.com/api/skills/${skill._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: skill.name,
              description: newDescription,
            }),
          }
        );

        const data = await response.json();

        alert(data.message);

        if (response.ok) {
          fetchSkills();
        }
      } catch (error) {
        alert("Could not update skill");
      }
    }}
  >
    ✏️ Edit
  </button>
)}
                <button
  className="auth-btn"
  onClick={async () => {
    try {
      const response = await fetch(
        "https://skillmate-lixb.onrender.com/api/requests/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId: userId,
            receiverId: skill.userId?._id,
            skillId: skill._id,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);
    } catch (error) {
      alert("Could not send request");
    }
  }}
>
  🤝 Send Learning Request
</button>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default Skills;