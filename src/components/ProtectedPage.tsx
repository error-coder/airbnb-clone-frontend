import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../lib/useUser';

interface IProtectedPageProps {
    children: React.ReactNode;
}

export default function ProtectedPage({ children }: IProtectedPageProps) {
    const navigate = useNavigate();
    const { userLoading, user, isLoggedIn } = useUser();

    useEffect(() => {
        if (!userLoading) {
            if (!isLoggedIn) {
                navigate('/');
            }
        }
    }, [userLoading, isLoggedIn, navigate]);

    return <>{children}</>;
}
