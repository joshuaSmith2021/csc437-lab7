import { Route, Routes, useNavigate } from "react-router-dom";
import App from "./App";
import LoginScreen from "./components/Login";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import CreatePost from "./components/CreatePost";
import PageLayout from "./components/Layout";
import SignupScreen from "./components/Signup";
import ProtectedRoute from "./ProtectedRoute";

export type BaseComponentProps = {
  authToken: string | undefined;
  setAuthToken: (authToken: string | undefined) => void;
  isDarkMode: boolean;
  setIsDarkMode: (mode: boolean) => void;
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
  }, [setToken, navigate]);

  return <></>;
}

function NotFound(props: BaseComponentProps) {
  return (
    <div
      className={`flex flex-col dark:bg-slate-950 justify-between h-screen items-stretch ${props.isDarkMode ? "dark" : ""}`}
    >
      <Navbar {...props} />
      <div className="flex flex-col items-center gap-4">
        <img className="saturate-50" src="/lostcat.png" />
        <h2 className="text-center text-4xl dark:text-white">Not Found</h2>
      </div>
      <div>{/* Spacer */}</div>
    </div>
  );
}

export default function AppRoutes() {
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const props = { authToken, setAuthToken, isDarkMode, setIsDarkMode };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute authToken={authToken}>
            <PageLayout {...props} children={<App {...props} />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PageLayout {...props} children={<LoginScreen {...props} />} />
        }
      />
      <Route
        path="/logout"
        element={
          <PageLayout
            {...props}
            children={<Logout setToken={setAuthToken} />}
          />
        }
      />
      <Route
        path="/create"
        element={
          <ProtectedRoute authToken={authToken}>
            <PageLayout
              {...props}
              children={<CreatePost {...props} />}
              hideFooter
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PageLayout {...props} children={<SignupScreen {...props} />} />
        }
      />
      <Route path="*" element={<NotFound {...props} />} />
    </Routes>
  );
}
