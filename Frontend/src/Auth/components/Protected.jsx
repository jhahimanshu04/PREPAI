import { useAuth } from "../hooks/useAuth.js";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f14] flex items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-violet-500/20 animate-ping" />
          <div className="absolute inset-2 rounded-full border-2 border-violet-400/40 animate-pulse" />
          <div className="absolute inset-4 rounded-full bg-violet-500/60 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Protected;