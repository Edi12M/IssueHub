import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  return (
    <div id="center">
      <section className="hero">
        <div className="hero-content">
          <h1>IssueHub</h1>
          <p>
            Welcome to IssueHub, your one-stop solution for efficient issue
            tracking and project management. Streamline your workflow,
            collaborate seamlessly, and stay organized with our intuitive
            platform designed to empower teams of all sizes.
          </p>
        </div>
        <img src={heroImg} alt="Hero Image" className="hero-image" />
      </section>

      <div id="spacer" />
    </div>
  );
}

export default App;
