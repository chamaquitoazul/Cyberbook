import { Center, CircularProgress } from "@chakra-ui/react";
import { useState, useEffect, Fragment } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { verifyAuth } from "../api";

interface Props {
  child: React.ReactNode;
}

const RequireAuth = ({ child }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setUser } = useAuth();
  useEffect(() => {
    const verifyToken = async () => {
      const user = await verifyAuth();
      if (user == null) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
        setUser(user);
      }
      setIsLoading(false);
    };
    verifyToken();
  }, []);

  if (isLoading) {
    return (
      <Fragment>
        <Center>
          <CircularProgress isIndeterminate />
        </Center>
      </Fragment>
    );
  }
  return isAuthenticated ? child : <Navigate to="/login" />;
};

export default RequireAuth;
