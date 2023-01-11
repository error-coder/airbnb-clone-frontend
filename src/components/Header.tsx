import { FaAirbnb, FaMoon } from "react-icons/fa";
import { Box, Button, HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LogInModal from "./LogInModal";
import SignUpModal from "./SignUpModal";

export default function Header(){
    const{ isOpen:isLoginOpen, onClose:onLoginClose, onOpen:onLoginOpen  } = useDisclosure();
    const { isOpen:isSignUpOpen, onClose:onSignUpClose, onOpen:onSignUpOpen } = useDisclosure();
    return (
        <HStack justifyContent={"space-between"} py={5} px={5} borderBottomWidth={1}>
            <Box color={"red.500"}>
                <Link to={"/"}>
                    <FaAirbnb size={"48"} />
                </Link>
            </Box>
            <HStack spacing={2}>
                <IconButton variant={"ghost"} aria-label="Toggle dark mode" icon={<FaMoon />} />
                <Button onClick={onLoginOpen}>Log In</Button>
                <Button onClick={onSignUpOpen} colorScheme={"red"}>Sign Up</Button>
            </HStack>
            <LogInModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </HStack>
    );
}