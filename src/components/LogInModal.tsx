import { useForm } from "react-hook-form";
import {
  Input,
  Box,
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaUserNinja, FaLock } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  usernameLogIn,
  IUsernameLoginError,
  IUsernameLoginSuccess,
  IUsernameLoginVariables,
} from "../api";

interface LogInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  username: string;
  password: string;
}

export default function LogInModal({ isOpen, onClose }: LogInModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IUsernameLoginSuccess,
    IUsernameLoginError,
    IUsernameLoginVariables
  >(usernameLogIn, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      toast({
        title: "Welcome back!",
        status: "success",
      });
      onClose();
      reset();
      queryClient.refetchQueries(["me"]);
    },
    onError: (error) => {
      console.log("mutation has an error");
    },
  });
  const onSubmit = ({ username, password }: IForm) => {
    mutation.mutate({ username, password });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup size="md">
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.username?.message)}
                {...register("username", {
                  required: "Please write a username",
                })}
                variant={"filled"}
                placeholder={"username"}
              />
              <Text fontSize={"sm"} color="red.500">
                {errors.username?.message}
              </Text>
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.password?.message)}
                {...register("password", {
                  required: "Please write a password",
                })}
                type="password"
                variant={"filled"}
                placeholder={"Password"}
              />
            </InputGroup>
          </VStack>
          <Button
            isLoading={mutation.isLoading}
            type="submit"
            marginTop={4}
            colorScheme={"red"}
            w="100%"
          >
            Log in
          </Button>
          {mutation.isError ? (
            <Text color={"red.500"} textAlign="center" fontSize={"sm"} mt={5}>
              Username or Password are wrong
            </Text>
          ) : null}
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}