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
    Select,
    VStack,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { FaUserNinja, FaLock, FaEnvelope, FaUserSecret } from 'react-icons/fa';
import { IUserSignUpVariables, usernameSignUp } from '../api';
import SocialLogin from './SocialLogin';

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IUserSignUpVariables>();

    const mutation = useMutation(usernameSignUp, {
        onSuccess: () => {
            onClose();
            queryClient.refetchQueries(['me']);
            reset();
        },
        onError: () => {
            reset();
        },
    });

    const onsubmit = ({
        username,
        password,
        name,
        email,
        gender,
        language,
        currency,
    }: IUserSignUpVariables) => {
        mutation.mutate({
            username,
            password,
            name,
            email,
            gender,
            language,
            currency,
        });
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sign up</ModalHeader>
                <ModalCloseButton />

                <ModalBody as="form" onSubmit={handleSubmit(onsubmit)}>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color="gray.500">
                                        <FaUserNinja />
                                    </Box>
                                }
                            />
                            <Input
                                isInvalid={Boolean(errors.username?.message)}
                                variant={'filled'}
                                placeholder="Username"
                                {...register('username', {
                                    required: 'Please write username',
                                })}
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color="gray.500">
                                        <FaLock />
                                    </Box>
                                }
                            />
                            <Input
                                type="password"
                                isInvalid={Boolean(errors.password?.message)}
                                variant={'filled'}
                                placeholder="Password"
                                {...register('password', {
                                    required: 'Please write password',
                                })}
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color="gray.500">
                                        <FaUserSecret />
                                    </Box>
                                }
                            />
                            <Input
                                isInvalid={Boolean(errors.name?.message)}
                                variant={'filled'}
                                placeholder="Name"
                                {...register('name', {
                                    required: 'Please write name',
                                })}
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color="gray.500">
                                        <FaEnvelope />
                                    </Box>
                                }
                            />
                            <Input
                                isInvalid={Boolean(errors.email?.message)}
                                type="email"
                                variant={'filled'}
                                placeholder="Email"
                                {...register('email', {
                                    required: 'Please write email',
                                })}
                            />
                        </InputGroup>

                        <Select
                            placeholder="Gender"
                            {...register('gender', {
                                required: 'Please select gender',
                            })}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Select>

                        <Select
                            placeholder="Language"
                            {...register('language', {
                                required: 'Please select language',
                            })}
                        >
                            <option value="kr">Korean</option>
                            <option value="en">English</option>
                        </Select>

                        <Select
                            placeholder="Currency"
                            {...register('currency', {
                                required: 'Please select currency',
                            })}
                        >
                            <option value="won">Korean Won</option>
                            <option value="usd">Dollar</option>
                        </Select>
                    </VStack>

                    <Button
                        type="submit"
                        isLoading={mutation.isLoading}
                        mt={4}
                        colorScheme={'red'}
                        w="100%"
                    >
                        Sign up
                    </Button>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
