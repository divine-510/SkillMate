import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

if (response.ok) {
  localStorage.setItem("userId", data.user.id);
  localStorage.setItem("userName", data.user.name);
}
if (response.ok) {
  window.location.href = "/dashboard";
}

setMessage(data.message);
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>SkillMate</h1>
        <h2>Welcome Back 👋</h2>

        <p className="auth-subtitle">
          Login to continue learning and sharing skills.
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-btn">
            Login
          </button>

        </form>

        {message && <p className="message">{message}</p>}

        <p className="switch-text">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

        <Link to="/" className="home-link">
          ← Back to Home
        </Link>

      </div>
    </div>
  );
}

export default Login;