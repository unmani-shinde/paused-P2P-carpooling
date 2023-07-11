import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import ProjectCard  from "./ProjectCard";
import projImg1 from "../../assets/img/jenny-ueberberg-v_1k3vRX4kg-unsplash.jpg";
import projImg2 from "../../assets/img/sincerely-media-dGxOgeXAXm8-unsplash.jpg";
import projImg3 from "../../assets/img/dan-nelson-ah-HeguOe9k-unsplash.jpg";
import projImg4 from "../../assets/img/artur-aldyrkhanov-tC0g72uns0M-unsplash.jpg";
import projImg5 from "../../assets/img/kylie-paz-aml-5TDo2_k-unsplash.jpg";
import projImg6 from "../../assets/img/jannis-lucas-3_Pm95bUwLg-unsplash.jpg";

import { ArrowRightCircle } from 'react-bootstrap-icons';
import colorSharp2 from "../../assets/img/color-sharp2.png";
// import 'animate.css';
import TrackVisibility from 'react-on-screen';

const Projects = () => {

  const projects = [
    {
      title: "Female Drivers",
      description: "Available on request to make your rides safe at odd hours",
      imgUrl: projImg1,
    },
    {
      title: "Student Benefits",
      description: "We can't help you with coursework, but with a valid ID, your travel is made easy.",
      imgUrl: projImg2,
    },
    {
      title: "Maximum Security",
      description: "Blockchain Technology ensures maximum data privacy for our users.",
      imgUrl: projImg3,
    },
  ];

  const vehiclesdescription = [
    {
      title: "Well-Equipped Navigation System",
      description: "To ensure you reach your destinations on time.",
      imgUrl: projImg6,
    },
    {
      title: "Spacious",
      description: "..or not, if you're a party of 2. Our vehicles comfortably fit any number of people.",
      imgUrl: projImg5,
    },
    {
      title: "Well-Maintained",
      description: "Comfortable rides on the worst of roads are ensured.",
      imgUrl: projImg4,
    },
  ];

  return (
    <section className="project" id="project">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Our Services</h2>
                <p>What makes us so different from other services?</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first" style={{fontWeight:'700',color:"white"}}>Features</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second"  style={{fontWeight:'700',color:"white"}}>Vehicles Available</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third" style={{fontWeight:'700',color:"white"}}>Offers Available</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    <p>Wide range of vehicles, suited for everyone, everyday.</p>
                    <Row>
                    {
                      

                      vehiclesdescription.map((project, index) => {
                        return (
                          <ProjectCard
                            key={index}
                            {...project}
                            />
                        )
                      })
                      
                    }      
                        
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <p>As a member of our carpooling network, you'll have access to an extensive network of verified drivers and passengers. Say goodbye to long commutes and hello to a more efficient and eco-friendly way of traveling. Our advanced matching algorithm intelligently connects you with compatible carpool partners, ensuring a seamless and comfortable ride every time.</p>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}

export default Projects;
