import { JSX } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type PageLayoutProps = {
  children: JSX.Element | string;
  hideFooter?: boolean;
};

export default function PageLayout({ children, hideFooter }: PageLayoutProps) {
  return (
    <>
      <div className="bg-slate-100 min-h-screen">
        <Navbar />
        {children}
        {!hideFooter && <Footer />}
      </div>
    </>
  );
}
