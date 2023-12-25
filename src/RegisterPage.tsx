import styled from "styled-components";
import { supabase } from "./db";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const RegisterPage = () => {
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

  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setLoginInfo((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await register(loginInfo)
      .then((res) => {
        alert("Creating account");
        navigate("/login");
      })
      .catch((err) => alert(err));
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Create an Account</h1>
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
      <AppLink type="submit">Register</AppLink>
      <AppLink type="button" onClick={() => navigate("/login")}>
        Back to Log In
      </AppLink>
    </form>
  );
};

export default RegisterPage;

const AppLink = styled.button`
  color: #61dafb;
  background: none;
  border: 1px solid;
  font-size: 3vmin;
`;
