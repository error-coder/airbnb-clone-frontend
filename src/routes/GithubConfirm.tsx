import { Text, Heading, VStack, Spinner, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { githubLogIn } from "../api";

export default function GithubConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(githubLogIn, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "welcome!",
      });
      queryClient.refetchQueries(["me"]);
      navigate("/");
    },
  });

  const confirmLogIn = async () => {
    const code = new URLSearchParams(search).get("code");
    if (code) {
      mutation.mutate(code);
    }
  };
  useEffect(() => {
    confirmLogIn();
  }, []);

  return (
    <VStack justifyContent={"center"} mt={40}>
      <Heading>Processing log in...</Heading>
      <Text>Don't go anywhere.</Text>
      <Spinner size="lg" />
    </VStack>
  );
}
