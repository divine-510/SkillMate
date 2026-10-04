import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Skills from "./pages/Skills";
import Requests from "./pages/Requests";
import Reviews from "./pages/Reviews";
import Dashboard from "./pages/Dashboard";

function Home() {
  return (
    <div className="container">

      <nav className="navbar">
        <div className="logo">SkillMate</div>

        <div className="nav-buttons">
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>

          <Link to="/register">
            <button className="register-btn">Register</button>
          </Link>
        </div>
      </nav>

      <section className="hero">
        <h1>SkillMate</h1>

        <h2>Learn. Share. Grow.</h2>

        <p>
          Connect with students, share your skills,
          learn from others, and grow together.
        </p>

        <Link to="/register">
          <button className="start-btn">Get Started</button>
        </Link>
      </section>

      <section className="features">

        <div className="feature-card">
          <h3>👤 Profile</h3>
          <p>
            Create your profile and showcase your skills.
          </p>
        </div>

        <div className="feature-card">
          <h3>📚 Skills</h3>
          <p>
            Add and discover skills from other students.
          </p>
        </div>

        <div className="feature-card">
          <h3>🤝 Connect</h3>
          <p>
            Send learning requests and connect with peers.
          </p>
        </div>

      </section>
      <section className="how-it-works">

  <h2>How SkillMate Works</h2>

  <p className="how-subtitle">
    Learn from your peers in three simple steps.
  </p>

  <div className="steps">

    <div className="step-card">
      <div className="step-number">1</div>
      <h3>📚 Share Your Skill</h3>
      <p>
        Add the skills you know and help other students learn.
      </p>
    </div>

    <div className="step-card">
      <div className="step-number">2</div>
      <h3>🤝 Send a Request</h3>
      <p>
        Find a skill you want to learn and send a learning request.
      </p>
    </div>

    <div className="step-card">
      <div className="step-number">3</div>
      <h3>⭐ Learn & Grow</h3>
      <p>
        Learn from your peers and share your experience through ratings.
      </p>
    </div>

  </div>

</section>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;