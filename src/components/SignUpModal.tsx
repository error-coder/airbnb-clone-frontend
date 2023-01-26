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
  Select,
  useToast,
  VStack,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaUserNinja, FaLock, FaEnvelope, FaUserSecret } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignUp } from "../api";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  name: string;
  email: string;
  username: string;
  password: string;
  currency: string;
  gender: string;
  language: string;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const { register, handleSubmit, reset } = useForm<IForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(SignUp, {
    onSuccess: () => {
      toast({ title: "Welcome!", status: "success" });
      onClose();
      queryClient.refetchQueries(["me"]);
    },
    onError: () => {
      reset();
    },
  });

  const onSubmit = ({
    username,
    password,
    name,
    email,
    currency,
    gender,
    language,
  }: IForm) => {
    mutation.mutate({
      username,
      email,
      name,
      password,
      currency,
      gender,
      language,
    });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserSecret />
                  </Box>
                }
              />
              <Input
                {...register("name", { required: true })}
                variant={"filled"}
                placeholder={"name"}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                {...register("email", { required: true })}
                variant={"filled"}
                placeholder={"email"}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                {...register("username", { required: true })}
                variant={"filled"}
                placeholder={"username"}
              />
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
                {...register("password", { required: true })}
                variant={"filled"}
                placeholder={"password"}
              />
            </InputGroup>
            <Select
              placeholder="currency option"
              {...register("currency", { required: true })}
            >
              <option value="won">Korean Won</option>
              <option value="usd">Dollar</option>
            </Select>
            <Select
              placeholder="gender option"
              {...register("gender", { required: true })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
            <Select
              placeholder="language option"
              {...register("language", { required: true })}
            >
              <option value="kr">Korean</option>
              <option value="en">English</option>
            </Select>
          </VStack>
          <Button
            isLoading={mutation.isLoading}
            mt={4}
            colorScheme={"red"}
            w="100%"
            type="submit"
          >
            Log in
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
