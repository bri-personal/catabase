import styled from "styled-components";
import { supabase } from "./db";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User, WeakPassword, Session } from "@supabase/gotrue-js";

interface LoginRegisterProps {
  titleText: string; // text shown at top of form
  alertText: string; // text shown when submission is successful
  redirectPath: string; // path to redirect if already logged in
  submitButtonText: string; // text on submit button
  submitButtonPath: string; // path to redirect when submission is successful
  otherButtonText: string; // text on other button (go to register/login)
  otherButtonPath: string; // path to redirect when other button clicked
  handleSubmitFunc: (loginInfo: {
    email: string;
    password: string;
  }) => Promise<{
    user: User | null;
    session: Session | null;
    weakPassword?: WeakPassword;
  }>; // function to call the auth API when submit button clicked (login/register)
}

// page shown for user to log in to their account
const LoginRegisterPage = (props: LoginRegisterProps) => {
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
        navigate(props.redirectPath);
      }
    }
    checkSession().catch((err) => alert(err));
  }, [navigate, props.redirectPath]);

  // function to update loginInfo for change in any field in log in form
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setLoginInfo((values) => ({ ...values, [name]: value }));
  };

  // function to handle submission by calling login with given info
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await props
      .handleSubmitFunc(loginInfo)
      .then(() => {
        alert(props.alertText);
        navigate(props.submitButtonPath);
      })
      .catch((err) => alert(err));
  };

  // login page component
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>{props.titleText}</h1>
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
      <AppLink type="submit">{props.submitButtonText}</AppLink>
      <AppLink type="button" onClick={() => navigate(props.otherButtonPath)}>
        {props.otherButtonText}
      </AppLink>
    </form>
  );
};

export default LoginRegisterPage;

// login and register button styling
const AppLink = styled.button`
  color: #61dafb;
  background: none;
  border: 1px solid;
  font-size: 3vmin;
`;
