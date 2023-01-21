import { useForm } from "react-hook-form";
import { Input, Box, Button, Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, VStack, InputGroup, InputLeftElement, Text, useToast, } from "@chakra-ui/react";
import { FaUserNinja, FaLock } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUsernameLoginError, IUsernameLoginSuccess, IUsernameLoginVariables, usernameLogIn } from "../api";

interface LogInModalProps {
    isOpen: boolean;
    onClose:() => void;
}

interface IForm {
    username: string;
    password: string;
}

export default function LogInModal({ isOpen, onClose } : LogInModalProps){
    const { register, handleSubmit, formState: {errors}, reset } = useForm<IForm>();
    const toast = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation<IUsernameLoginSuccess, IUsernameLoginError, IUsernameLoginVariables>(usernameLogIn, {
        onMutate:() => {
            console.log("mutation starting");
        },
        onSuccess:(data) => {
            toast({
                title:"welcome back!",
                status:"success",
            });
            onClose();
            queryClient.refetchQueries(["me"]);
            reset();
        },
    });
    const onSubmit = ({username, password}: IForm) => {
        mutation.mutate({ username, password });
    }
    console.log(errors);
        return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton />
                <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <VStack>
                        <InputGroup>
                        <InputLeftElement children={
                            <Box color={"gray.500"}>
                                <FaUserNinja />
                            </Box>
                        } />
                            <Input  {...register("username", {required:"Please write a username",})} required  variant={"filled"} placeholder={"Username"} />
                            <Text fontSize={"sm"} color="red.500">{errors.username?.message}</Text>
                        </InputGroup>
                        <InputGroup>
                        <InputLeftElement children={ <Box color={"gray.500"}><FaLock /></Box>} />
                            <Input isInvalid={Boolean(errors.username?.message)} required {...register("password", {required:"Please write a password",})} type="password" variant={"filled"} placeholder={"Password"} />
                            <Text fontSize={"sm"} color="red.500">{errors.password?.message}</Text>
                        </InputGroup>
                    </VStack>
                    {mutation.isError ? <Text color="red.500" textAlign={"center"} fontSize="sm">Username or Password are wrong</Text> : null}
                    <Button isLoading={mutation.isLoading} type="submit" mt={4} colorScheme={"red"} w="100%">Log in</Button>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}