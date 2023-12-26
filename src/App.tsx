import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import LoginRegisterPage from "./LoginRegisterPage";
import { supabase } from "./db";

// parent component containing all pages
function App() {
  return (
    <AppDiv>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <LoginRegisterPage
              titleText="Log In to Catabase"
              alertText="Logging in"
              redirectPath="/"
              submitButtonText="Log In"
              submitButtonPath="/"
              otherButtonText="Register"
              otherButtonPath="/register"
              handleSubmitFunc={async (loginInfo: {
                email: string;
                password: string;
              }) => {
                const { data, error } = await supabase.auth.signInWithPassword({
                  email: loginInfo.email,
                  password: loginInfo.password,
                });

                if (error) {
                  throw error;
                }

                return data;
              }}
            />
          }
        />
        <Route
          path="/register"
          element={
            <LoginRegisterPage
              titleText="Create an Account"
              alertText="Creating account"
              redirectPath="/"
              submitButtonText="Register"
              submitButtonPath="/register/verify"
              otherButtonText="Back to Login"
              otherButtonPath="/login"
              handleSubmitFunc={async (loginInfo: {
                email: string;
                password: string;
              }) => {
                const { data, error } = await supabase.auth.signUp({
                  email: loginInfo.email,
                  password: loginInfo.password,
                });

                if (error) {
                  throw error;
                }

                return data;
              }}
            />
          }
        />
        <Route
          path="/register/verify"
          element={<h1>Check your email to verify your registration!</h1>}
        />
      </Routes>
    </AppDiv>
  );
}

export default App;

// theme and text styling for all pages
const AppDiv = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;
