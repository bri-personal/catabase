import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import styled, { keyframes } from "styled-components";
import { Route, Routes, useNavigate } from "react-router-dom";
import { supabase } from "./db";
import { Database } from "./database.types";
import { PostgrestError } from "@supabase/supabase-js";

function App() {
  const [countries, setCountries] = useState(
    Array<Database["public"]["Tables"]["countries"]["Row"]>,
  );

  useEffect(() => {
    getCountries().catch((error: PostgrestError) => alert(error));
  }, []);

  async function getCountries() {
    const { data, error } = await supabase.from("countries").select();
    if (error) {
      throw error;
    }

    setCountries(data);
  }

  return (
    <AppDiv>
      <Routes>
        <Route
          path=""
          element={<AppHeader text="To Log In!" link="/login" />}
        />
        <Route path="/login" element={<AppHeader text="Log In" link="/" />} />
      </Routes>
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
    </AppDiv>
  );
}

export default App;

const AppHeader = (props: { text: string; link: string }) => {
  const navigate = useNavigate();

  return (
    <AppHeaderContainer>
      <AppLogo src={logo} alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <AppLink
        onClick={() => {
          navigate(props.link);
        }}
      >
        {props.text}
      </AppLink>
    </AppHeaderContainer>
  );
};

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

const AppLink = styled.button`
  color: #61dafb;
  background: none;
  border: 1px solid;
  font-size: 3vmin;
`;
