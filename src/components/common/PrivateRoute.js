import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const auth = localStorage.getItem("userId");
  return auth ? children : <Navigate to="/signup" />;
}

export default PrivateRoute;
