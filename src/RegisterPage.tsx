import styled from "styled-components";
import { supabase } from "./db";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// page shown for user to create a new account
const RegisterPage = () => {
  const navigate = useNavigate();

  // state containing username and password
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  // flag for whether user has created account yet or not
  const [hasRegistered, setHasRegistered] = useState(false);

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

  // async function to create a new account through supabase auth
  async function register(loginInfo: { email: string; password: string }) {
    const { data, error } = await supabase.auth.signUp({
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

  // function to handle submission by calling sign up with given info
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await register(loginInfo)
      .then((res) => {
        alert("Creating account");
        setHasRegistered(true);
      })
      .catch((err) => alert(err));
  };

  // registration page component
  return hasRegistered ? (
    // has registered -> tell user to check email for confirmation link
    <h1>Check your email to confirm your registration!</h1>
  ) : (
    // has not registered -> show registration form
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Create an Account</h1>
      <label>
        Email
        {/*
         */}
        <input
          type="text"
          name="email"
          value={loginInfo.email || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Password
        {/*
         */}
        <input
          type="password"
          name="password"
          value={loginInfo.password || ""}
          onChange={handleChange}
        />
      </label>
      <AppLink type="submit">Register</AppLink>
      <AppLink type="button" onClick={() => navigate("/login")}>
        Back to Log In
      </AppLink>
    </form>
  );
};

export default RegisterPage;

// login and register button styling
const AppLink = styled.button`
  color: #61dafb;
  background: none;
  border: 1px solid;
  font-size: 3vmin;
`;
