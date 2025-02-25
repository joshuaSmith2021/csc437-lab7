import { Route, Routes, useNavigate } from "react-router-dom";
import App from "./App";
import LoginScreen from "./components/Login";
import Navbar from "./components/Navbar";
import { doLogout } from "./fetch/auth";
import { useEffect } from "react";
import CreatePost from "./components/CreatePost";
import PageLayout from "./components/Layout";
import SignupScreen from "./components/Signup";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    doLogout();
    navigate("/");
  }, []);

  return <></>;
}

function NotFound() {
  return (
    <div className="flex flex-col justify-between h-screen items-stretch">
      <Navbar />
      <div className="flex flex-col items-center gap-4">
        <img className="saturate-50" src="/lostcat.png" />
        <h2 className="text-center text-4xl">Not Found</h2>
      </div>
      <div>{/* Spacer */}</div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout children={<App />} />} />
      <Route
        path="/login"
        element={<PageLayout children={<LoginScreen />} />}
      />
      <Route path="/logout" element={<PageLayout children={<Logout />} />} />
      <Route
        path="/create"
        element={<PageLayout children={<CreatePost />} hideFooter />}
      />
      <Route
        path="/register"
        element={<PageLayout children={<SignupScreen />} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
