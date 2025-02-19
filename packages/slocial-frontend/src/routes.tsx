import { Route, Routes, useNavigate } from "react-router-dom";
import App from "./App";
import { LoginScreen } from "./components/Login";
import Navbar from "./components/Navbar";
import { doLogout } from "./fetch/auth";
import { useEffect } from "react";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    doLogout();
    navigate('/')
  }, [])

  return <></>
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
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
