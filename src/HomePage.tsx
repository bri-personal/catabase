import { PostgrestError } from "@supabase/postgrest-js";
import { useEffect, useState } from "react";
import { supabase } from "./db";
import { Database } from "./types";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import logo from "./logo.svg";

const HomePage = () => {
  const navigate = useNavigate();

  // state for countries list from database (CHANGE LATER)
  const [countries, setCountries] = useState(
    Array<Database["public"]["Tables"]["countries"]["Row"]>,
  );

  // when page opens, ensure session is valid
  // if it is valid, fetch countries from database (CHANGE LATER)
  // if it is not valid, redirect to login page
  useEffect(() => {
    async function checkSession() {
      let { data, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
      if (!data.session) {
        navigate("/login");
      }
    }
    checkSession()
      .then(() => getCountries().catch((error: PostgrestError) => alert(error)))
      .catch((err) => alert(err));
  }, [navigate]);

  // async function to log out of account
  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  // fetch countries from database (CHANGE LATER)
  async function getCountries() {
    const { data, error } = await supabase.from("countries").select();
    if (error) {
      throw error;
    }

    setCountries(data);
  }

  // home page component
  return (
    <>
      <AppLogo src={logo} alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <AppLink
        onClick={async () => {
          await logout()
            .then(() => {
              alert("Logging out");
              navigate("/login");
            })
            .catch((err) => alert(err));
        }}
      >
        {"Log Out"}
      </AppLink>
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;

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
