import Button from "../Components/Button/button.jsx";
import heroImg from "../assets/hero.png";
import "../App.css";

export default function Hero() {
  return (
    <main className="hero-page">
      <section className="hero-card card">
        <div className="eyebrow">IssueHub</div>
        <h1>Track issues and ship work faster.</h1>
        <p className="hero-copy">
          IssueHub keeps your team organized with a simple landing page here and
          an admin dashboard behind it.
        </p>
        <Button to="/admin" size="lg">
          Open Admin Dashboard
        </Button>
      </section>

      <section className="hero-media card">
        <img src={heroImg} alt="IssueHub hero illustration" />
      </section>
    </main>
  );
}
