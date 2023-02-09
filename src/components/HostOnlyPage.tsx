import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";

interface IHostOnlyPageProps {
  children: ReactNode;
}

export default function HostOnlyPage({ children }: IHostOnlyPageProps) {
  const { userLoading, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading) {
      if (!user?.is_host) {
        navigate("/");
      }
    }
  }, [userLoading, user, navigate]);

  return <>{children}</>;
}
