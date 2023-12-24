import { PostgrestError } from "@supabase/postgrest-js";
import { useEffect, useState } from "react";
import { supabase } from "./db";
import { Database } from "./types";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import logo from "./logo.svg";

const Home = () => {
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

  const navigate = useNavigate();

  return (
    <>
      <AppLogo src={logo} alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <AppLink
        onClick={() => {
          navigate("/");
        }}
      >
        {"Press me!"}
      </AppLink>
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Home;

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

const AppLink = styled.button`
  color: #61dafb;
  background: none;
  border: 1px solid;
  font-size: 3vmin;
`;
