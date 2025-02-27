import { Link } from "react-router-dom";
import { useCurrentUser } from "../fetch/auth";

export default function Footer() {
  const currentUser = useCurrentUser();
  return (
    currentUser && (
      <>
        <div className="fixed bottom-0 w-screen z-2">
          <div className="flex justify-center">
            <button className="bg-slate-600 text-white rounded-xl px-10 py-5">
              <Link to="/create">Create Post</Link>
            </button>
          </div>
        </div>
        <div className="fixed bottom-0 w-screen bg-slate-600 h-8 z-1"></div>
      </>
    )
  );
}
