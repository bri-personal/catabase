import styled from "styled-components";
import { supabase } from "./db";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "example@email.com",
      password: "example-password",
    });

    if (error) {
      throw error;
    }

    return data.user;
  }

  return (
    <>
      <h1>Login</h1>
      <AppLink
        onClick={async () => {
          await login()
            .then(() => {
              alert("Logging in");
              navigate("/");
            })
            .catch((err) => alert(err));
        }}
      >
        Click to log in
      </AppLink>
    </>
  );
};

export default Login;

const AppLink = styled.button`
  color: #61dafb;
  background: none;
  border: 1px solid;
  font-size: 3vmin;
`;
