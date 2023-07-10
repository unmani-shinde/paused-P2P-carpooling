import styled from "styled-components";

import "./App.css";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
function App() {
  return (
    <Container>
      <Card>
        <Sidebar />
        <MainContent />
      </Card>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg,#E975A8, #726CF8) !important
`;

const Card = styled.div`
  height: 90vh;
  width: 80vw;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(14px);
  border-radius: 10px;
  display: flex;
`;

export default App;
