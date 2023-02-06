import {
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { FaUserNinja, FaLock } from 'react-icons/fa';
import { usernameLogin } from '../api';
import SocialLogin from './SocialLogin';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IForm {
    username: string;
    password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const toast = useToast();
    const queryClient = useQueryClient();

    const mutation = useMutation(usernameLogin, {
        onSuccess: () => {
            toast({
                title: 'welcome back!',
                status: 'success',
            });
            onClose();
            queryClient.refetchQueries(['me']);
            reset();
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IForm>();

    const onSubmit = ({ username, password }: IForm) => {
        mutation.mutate({ username, password });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton />

                <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color={'gray.500'}>
                                        <FaUserNinja />
                                    </Box>
                                }
                            />
                            <Input
                                isInvalid={Boolean(errors.username?.message)}
                                {...register('username', {
                                    required: 'Please write username',
                                })}
                                variant={'filled'}
                                placeholder="Username"
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color={'gray.500'}>
                                        <FaLock />
                                    </Box>
                                }
                            />
                            <Input
                                isInvalid={Boolean(errors.password?.message)}
                                {...register('password', {
                                    required: 'Please write password',
                                })}
                                type={'password'}
                                variant={'filled'}
                                placeholder="Password"
                            />
                        </InputGroup>
                    </VStack>

                    {mutation.isError ? (
                        <Text
                            fontSize={'sm'}
                            textAlign="center"
                            color="red.500"
                        >
                            Username or Password are wrong
                        </Text>
                    ) : null}

                    <Button
                        isLoading={mutation.isLoading}
                        type="submit"
                        width={'100%'}
                        mt={4}
                        colorScheme="red"
                    >
                        Log in
                    </Button>

                    <SocialLogin />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
