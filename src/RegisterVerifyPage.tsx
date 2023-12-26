import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RegisterVerifyPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Check your email to verify your registration!</h1>
      <AppLink onClick={() => navigate("/login")}>Back to Login</AppLink>
    </>
  );
};

export default RegisterVerifyPage;

// return to login button styling
const AppLink = styled.button`
  color: #61dafb;
  background: none;
  border: 1px solid;
  font-size: 3vmin;
`;
