import { JSX } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BaseComponentProps } from "../routes";

type PageLayoutProps = {
  children: JSX.Element | string;
  hideFooter?: boolean;
};

export default function PageLayout({
  children,
  hideFooter,
  authToken,
  setAuthToken,
  isDarkMode,
  setIsDarkMode,
}: PageLayoutProps & BaseComponentProps) {
  return (
    <>
      <div
        className={`bg-slate-100 min-h-screen ${(isDarkMode && "dark") || ""}`}
      >
        <Navbar
          authToken={authToken}
          setAuthToken={setAuthToken}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        {children}
        {!hideFooter && (
          <Footer
            authToken={authToken}
            setAuthToken={setAuthToken}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        )}
      </div>
    </>
  );
}
