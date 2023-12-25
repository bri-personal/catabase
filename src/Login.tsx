import styled from "styled-components";
import { supabase } from "./db";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthApiError } from "@supabase/gotrue-js";

const Login = () => {
  const navigate = useNavigate();

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

  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setLoginInfo((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await login(loginInfo)
      .then((res) => {
        alert("Logging in");
        navigate("/");
      })
      .catch((err) => {
        if (err instanceof AuthApiError) {
          alert("Email or Password is incorrect!");
        } else {
          alert(err);
        }
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h1>Login</h1>
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
      <AppLink type="submit">Click to log in</AppLink>
    </form>
  );
};

export default Login;

const AppLink = styled.button`
  color: #61dafb;
  background: none;
  border: 1px solid;
  font-size: 3vmin;
`;
