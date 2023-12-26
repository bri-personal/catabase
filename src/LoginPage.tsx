import styled from "styled-components";
import { supabase } from "./db";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// page shown for user to log in to their account
const LoginPage = () => {
  const navigate = useNavigate();

  // state containing username and password
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  // when page is opened, check if user session is active
  // if session is active, redirect to home page
  useEffect(() => {
    async function checkSession() {
      let { data, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
      if (data.session) {
        navigate("/");
      }
    }
    checkSession().catch((err) => alert(err));
  }, [navigate]);

  // async function to sign in and get session through supabase auth
  async function login(loginInfo: { email: string; password: string }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginInfo.email,
      password: loginInfo.password,
    });

    if (error) {
      throw error;
    }

    return data;
  }

  // function to update loginInfo for change in any field in log in form
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setLoginInfo((values) => ({ ...values, [name]: value }));
  };

  // function to handle submission by calling login with given info
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await login(loginInfo)
      .then((res) => {
        alert("Logging in");
        navigate("/");
      })
      .catch((err) => alert(err));
  };

  // login page component
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Log In to Catabase</h1>
      <label>
        Email
        <input
          type="text"
          name="email"
          value={loginInfo.email || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={loginInfo.password || ""}
          onChange={handleChange}
        />
      </label>
      <AppLink type="submit">Log In</AppLink>
      <AppLink type="button" onClick={() => navigate("/register")}>
        Register
      </AppLink>
    </form>
  );
};

export default LoginPage;

// login and register button styling
const AppLink = styled.button`
  color: #61dafb;
  background: none;
  border: 1px solid;
  font-size: 3vmin;
`;
