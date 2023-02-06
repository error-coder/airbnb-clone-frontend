import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../lib/useUser';

interface IProtectedPageProps {
    children: React.ReactNode;
}

export default function HostOnlyPage({ children }: IProtectedPageProps) {
    const navigate = useNavigate();
    const { userLoading, user } = useUser();

    useEffect(() => {
        if (!userLoading) {
            if (!user?.is_host) {
                navigate('/');
            }
        }
    }, [userLoading, user, navigate]);

    return <>{children}</>;
}
