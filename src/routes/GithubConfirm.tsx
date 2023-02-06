import { Heading, Spinner, Text, useToast, VStack } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { githubLogIn } from '../api';

export default function GithubConfirm() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    const queryClient = useQueryClient();

    const mutation = useMutation(githubLogIn, {
        onSuccess: () => {
            toast({
                status: 'success',
                title: 'Welcome!',
                description: 'Happy 2 have u back!',
            });

            queryClient.refetchQueries(['me']);
            navigate('/');
        },
    });

    const confirmLogin = async () => {
        const params = new URLSearchParams(search);
        const code = params.get('code');

        if (code) mutation.mutate(code);
    };

    useEffect(() => {
        confirmLogin();
    }, []);

    return (
        <VStack justifyContent={'center'} mt={40}>
            <Heading>Processing log in...</Heading>
            <Text>Don't go anywhere.</Text>
            <Spinner size="xl" />
        </VStack>
    );
}
