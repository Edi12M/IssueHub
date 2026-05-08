import { useState } from "react";
import { Container, Form, InputGroup } from "react-bootstrap";
import Button from "./Button/button.jsx";
import logo from "../assets/appLogo-removebg.png";

import { Eye, EyeSlash } from "react-bootstrap-icons";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

      <Form>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-4">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeSlash /> : <Eye />}
            </Button>
          </InputGroup>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default LoginForm;
