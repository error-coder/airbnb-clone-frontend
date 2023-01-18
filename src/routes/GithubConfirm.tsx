import { Text, Heading, VStack, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { githubLogIn } from "../api";


export default function GithubConfirm(){
    const {search} = useLocation();
    const confirmLogIn = async() => {
        const params = new URLSearchParams(search);
        const code = params.get("code");
        if (code) { 
            await githubLogIn(code);
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