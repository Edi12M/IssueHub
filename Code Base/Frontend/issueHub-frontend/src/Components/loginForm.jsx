import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, InputGroup } from "react-bootstrap";
import Button from "./Button/button.jsx";
import logo from "../assets/appLogo-removebg.png";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { setSession } from "../data/users.js";
import { authAPI } from "../services/api.js";

const ROLE_ROUTES = {
  "System Administrator": "/admin",
  "Project Manager": "/manager",
  Developer: "/dev/assigned-issues",
  Viewer: "/dev/assigned-issues",
};

// Demo hint rows — UI only, not used for auth logic
const DEMO_HINTS = [
  { role: "System Admin", email: "admin@issuehub.com", password: "Admin@123" },
  { role: "Project Manager", email: "pm@issuehub.com", password: "PM@123" },
  {
    role: "Dev · Alex Rivera",
    email: "alex@issuehub.com",
    password: "Alex@123",
  },
  {
    role: "Dev · Maya Patel",
    email: "maya@issuehub.com",
    password: "Maya@123",
  },
  {
    role: "Dev · Jordan Kim",
    email: "jordan@issuehub.com",
    password: "Jordan@123",
  },
];

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authAPI.login({
        email: email.trim(),
        password: password,
      });

      if (response && response.user) {
        setSession(response.user);
        navigate(ROLE_ROUTES[response.user.role] ?? "/dev/assigned-issues");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container
      className="login-form p-4 shadow rounded"
      style={{ maxWidth: "400px" }}
    >
      <div className="formHead">
        <img
          src={logo}
          alt="logo"
          width="90px"
          height="90px"
          style={{ padding: "10px" }}
        />
        <h3 className="text-center">Welcome</h3>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            required
            disabled={loading}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-4">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
              disabled={loading}
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={loading}
            >
              {showPassword ? <EyeSlash /> : <Eye />}
            </Button>
          </InputGroup>
        </Form.Group>

        {error && (
          <p
            style={{ color: "#f87171", fontSize: "13px", marginBottom: "12px" }}
          >
            {error}
          </p>
        )}

        <Button
          variant="primary"
          type="submit"
          style={{ width: "100%" }}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </Form>

      {/* Demo credentials hint */}
      <div
        style={{
          marginTop: "24px",
          padding: "14px 16px",
          borderRadius: "10px",
          background: "rgba(107,228,255,0.06)",
          border: "1px solid rgba(107,228,255,0.15)",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#475569",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            margin: "0 0 10px",
          }}
        >
          Demo Accounts
        </p>
        {DEMO_HINTS.map((c) => (
          <button
            key={c.email}
            type="button"
            onClick={() => {
              setEmail(c.email);
              setPassword(c.password);
              setError("");
            }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "6px 0",
              cursor: "pointer",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              opacity: loading ? 0.5 : 1,
              pointerEvents: loading ? "none" : "auto",
            }}
            disabled={loading}
          >
            <span
              style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}
            >
              {c.role}
            </span>
            <span
              style={{
                fontSize: "11px",
                color: "#475569",
                fontFamily: "monospace",
              }}
            >
              {c.email}
            </span>
          </button>
        ))}
        <p style={{ fontSize: "11px", color: "#334155", margin: "8px 0 0" }}>
          Click a row to fill credentials, then sign in.
        </p>
      </div>
    </Container>
  );
}

export default LoginForm;
