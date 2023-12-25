import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import RegisterPage from "./RegisterPage";

function App() {
  return (
    <AppDiv>
      <AppHeaderContainer>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </AppHeaderContainer>
    </AppDiv>
  );
}

export default App;

const AppDiv = styled.div`
  text-align: center;
`;

const AppHeaderContainer = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;
