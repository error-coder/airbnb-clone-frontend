import { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";

interface IHostOnlyPageProps {
  children: ReactNode;
}

export default function HostOnlyPage({ children }: IHostOnlyPageProps) {
  const { user, userLoading } = useUser();
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
