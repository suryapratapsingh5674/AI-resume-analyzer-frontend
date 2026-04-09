import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "5vw",
          height: "100vh",
        }}
      >
        Loading...
      </h1>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default Protected;
