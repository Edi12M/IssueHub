import { Carousel } from "react-bootstrap";
import LoginForm from "../Components/loginForm";

import carouselImage1 from "../assets/carousel_1.png";
import carouselImage2 from "../assets/carousel_2.png";
import carouselImage3 from "../assets/carousel_3.png";
import carouselImage4 from "../assets/carousel_4.png";

export default function Login() {
  return (
    <div className="login-page d-flex">
      {/* Left side: Carousel */}
      <div className="login-carousel-container">
        <Carousel interval={3000} pause={false}>
          <Carousel.Item>
            <img className="d-block w-100" src={carouselImage1} />
            <Carousel.Caption>
              <h2>Analytics & Overview Dashboard</h2>
              <p>
                Turn Chaos into Clarity — Manage Every Task, Every Sprint, in
                One Intelligent Workspace.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src={carouselImage2} />
            <Carousel.Caption>
              <h2>Global Team Collaboration View</h2>
              <p>
                Work Without Borders — Real-Time Collaboration That Connects
                Teams Across the World.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src={carouselImage3} />
            <Carousel.Caption>
              <h2>Timeline Visualization</h2>
              <p>
                Plan with Precision — Visualize Timelines, Hit Milestones, and
                Deliver On Time.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src={carouselImage4} />
            <Carousel.Caption>
              <h2>AI-Powered Assistance</h2>
              <p>
                {" "}
                Smarter Projects Start Here — Let AI handle the complexity while
                your team focuses on impact.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Right side: Login or SignUp Form */}
      <div className="login-form-side d-flex align-items-center justify-content-center">
        <LoginForm />
      </div>
    </div>
  );
}
