import { Route, Routes, useNavigate } from "react-router-dom";
import App from "./App";
import LoginScreen from "./components/Login";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import CreatePost from "./components/CreatePost";
import PageLayout from "./components/Layout";
import SignupScreen from "./components/Signup";

export type AuthTokenComponentProps = {
  authToken: string | undefined;
  setAuthToken: (authToken: string | undefined) => void;
};

function Logout({
  setToken,
}: {
  setToken: (token: string | undefined) => void;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    setToken(undefined);
    navigate("/");
  }, []);

  return <></>;
}

function NotFound({ authToken, setAuthToken }: AuthTokenComponentProps) {
  return (
    <div className="flex flex-col justify-between h-screen items-stretch">
      <Navbar authToken={authToken} setAuthToken={setAuthToken} />
      <div className="flex flex-col items-center gap-4">
        <img className="saturate-50" src="/lostcat.png" />
        <h2 className="text-center text-4xl">Not Found</h2>
      </div>
      <div>{/* Spacer */}</div>
    </div>
  );
}

export default function AppRoutes() {
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageLayout
            authToken={authToken}
            setAuthToken={setAuthToken}
            children={<App />}
          />
        }
      />
      <Route
        path="/login"
        element={
          <PageLayout
            authToken={authToken}
            setAuthToken={setAuthToken}
            children={
              <LoginScreen authToken={authToken} setAuthToken={setAuthToken} />
            }
          />
        }
      />
      <Route
        path="/logout"
        element={
          <PageLayout
            authToken={authToken}
            setAuthToken={setAuthToken}
            children={<Logout setToken={setAuthToken} />}
          />
        }
      />
      <Route
        path="/create"
        element={
          <PageLayout
            authToken={authToken}
            setAuthToken={setAuthToken}
            children={<CreatePost />}
            hideFooter
          />
        }
      />
      <Route
        path="/register"
        element={
          <PageLayout
            authToken={authToken}
            setAuthToken={setAuthToken}
            children={
              <SignupScreen authToken={authToken} setAuthToken={setAuthToken} />
            }
          />
        }
      />
      <Route
        path="*"
        element={<NotFound authToken={authToken} setAuthToken={setAuthToken} />}
      />
    </Routes>
  );
}
