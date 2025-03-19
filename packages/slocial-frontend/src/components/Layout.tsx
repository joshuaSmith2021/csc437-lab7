import { JSX } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AuthTokenComponentProps } from "../routes";

type PageLayoutProps = {
  children: JSX.Element | string;
  hideFooter?: boolean;
};

export default function PageLayout({
  children,
  hideFooter,
  authToken,
  setAuthToken,
}: PageLayoutProps & AuthTokenComponentProps) {
  return (
    <>
      <div className="bg-slate-100 min-h-screen">
        <Navbar authToken={authToken} setAuthToken={setAuthToken} />
        {children}
        {!hideFooter && (
          <Footer authToken={authToken} setAuthToken={setAuthToken} />
        )}
      </div>
    </>
  );
}
