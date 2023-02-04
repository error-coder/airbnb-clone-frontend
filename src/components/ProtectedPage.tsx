import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";

interface IProtectedPageProps {
  children: ReactNode;
}

export default function ProtectedPage({ children }: IProtectedPageProps) {
  const { userLoading, isLoggedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading) {
      if (!isLoggedIn) {
        navigate("/");
      }
    }
  }, [userLoading, isLoggedIn, navigate]);

  return <>{children}</>;
}