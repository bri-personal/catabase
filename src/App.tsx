import React from "react";
import logo from "./logo.svg";
import styled, { keyframes } from "styled-components";

function App() {
  return (
    <AppDiv>
      <AppHeader>
        <AppLogo src={logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <AppLink
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </AppLink>
      </AppHeader>
    </AppDiv>
  );
}

export default App;

const AppDiv = styled.div`
  text-align: center;
`;

const AppLogoRotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AppLogo = styled.img`
  height: 40vmin;
  pointer-events: none;
  prefers-reduced-motion: no-preference;
  animation: ${AppLogoRotate} infinite 20s linear;
`;

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 97vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const AppLink = styled.a`
  color: #61dafb;
`;
