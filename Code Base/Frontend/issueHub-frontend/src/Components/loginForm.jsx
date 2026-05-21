import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, InputGroup } from "react-bootstrap";
import Button from "./Button/button.jsx";
import logo from "../assets/appLogo-removebg.png";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { validateUserCredentials, setSession } from "../data/users.js";
import { loginApi } from "../api/index.js";

const ROLE_ROUTES = {
  "System Administrator": "/admin",
  "Project Manager": "/manager",
  Developer: "/dev/assigned-issues",
  Viewer: "/dev/assigned-issues",
};

const DEMO_HINTS = [
  { role: "System Admin", email: "admin@issuehub.com", password: "Testing123!" },
  { role: "Project Manager", email: "pm@issuehub.com", password: "Testing123!" },
  { role: "Developer One", email: "dev1@issuehub.com", password: "Testing123!" },
  { role: "Developer Two", email: "dev2@issuehub.com", password: "Testing123!" },
  { role: "Developer Three", email: "dev3@issuehub.com", password: "Testing123!" },
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
    setError("");
    setLoading(true);
    try {
      // Try backend first — will throw on 400/401 or network error
      const user = await loginApi(email.trim(), password);
      setSession(user);
      navigate(ROLE_ROUTES[user.role] ?? "/dev/assigned-issues");
    } catch {
      // Fall back to localStorage seed accounts
      const user = validateUserCredentials(email.trim(), password);
      if (user && user.role) {
        setSession(user);
        navigate(ROLE_ROUTES[user.role] ?? "/dev/assigned-issues");
      } else {
        setError("Invalid email or password.");
      }
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
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
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
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
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
          <p style={{ color: "#f87171", fontSize: "13px", marginBottom: "12px" }}>
            {error}
          </p>
        )}

        <Button
          variant="primary"
          type="submit"
          style={{ width: "100%" }}
          disabled={loading}
        >
          {loading ? "Signing in…" : "Sign In"}
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
            onClick={() => { setEmail(c.email); setPassword(c.password); setError(""); }}
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
            }}
            disabled={loading}
          >
            <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>
              {c.role}
            </span>
            <span style={{ fontSize: "11px", color: "#475569", fontFamily: "monospace" }}>
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
