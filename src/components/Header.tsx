import {
    Box,
    Button,
    IconButton,
    useColorMode,
    useDisclosure,
    useColorModeValue,
    Stack,
    HStack,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useToast,
    ToastId,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { FaAirbnb, FaMoon, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { logOut } from '../api';
import useUser from '../lib/useUser';
import LoginModal from './LogInModal';
import SignUpModal from './SignUpModal';

export default function Header() {
    const toastId = useRef<ToastId>();
    const toast = useToast();
    const queryClient = useQueryClient();
    const logoColor = useColorModeValue('red.500', 'red.200');
    const Icon = useColorModeValue(<FaMoon />, <FaSun />);

    const { colorMode, toggleColorMode } = useColorMode();

    const { userLoading, user, isLoggedIn } = useUser();
    const {
        isOpen: isLoginOpen,
        onClose: onLoginClose,
        onOpen: onLoginOpen,
    } = useDisclosure();
    const {
        isOpen: isSignUpOpen,
        onClose: onSignUpClose,
        onOpen: onSignUpOpen,
    } = useDisclosure();

    const mutation = useMutation(logOut, {
        onMutate: () => {
            toastId.current = toast({
                title: 'Login out...',
                description: 'Sad 2 c u go...',
                status: 'loading',
                position: 'bottom-right',
            });
        },
        onSuccess: () => {
            queryClient.refetchQueries(['me']);

            if (toastId.current) {
                toast.update(toastId.current, {
                    title: 'Done!',
                    description: 'C u later!',
                    status: 'success',
                });
            }
        },
    });

    const onLogOut = () => {
        mutation.mutate();
    };

    return (
        <Stack
            direction={{
                sm: 'column',
                md: 'row',
            }}
            justifyContent={'space-between'}
            alignItems="center"
            spacing={{ sm: 4, md: 0 }}
            py={5}
            px={40}
            borderBottomWidth={1}
        >
            <Box color={logoColor}>
                <Link to="/">
                    <FaAirbnb size={'48'} />
                </Link>
            </Box>

            <HStack spacing={'2'}>
                <IconButton
                    variant={'ghost'}
                    aria-label="Toggle dark mode"
                    icon={Icon}
                    onClick={toggleColorMode}
                />
                {!userLoading ? (
                    isLoggedIn ? (
                        <Menu>
                            <MenuButton>
                                <Avatar
                                    name={user.name}
                                    src={user.avatar}
                                    size={'md'}
                                />
                            </MenuButton>

                            <MenuList>
                                {user.is_host ? (
                                    <Link to="/rooms/upload">
                                        <MenuItem>Upload room</MenuItem>
                                    </Link>
                                ) : null}
                                <MenuItem onClick={onLogOut}>Log out</MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <>
                            <Button onClick={onLoginOpen}>Log in</Button>
                            <Button colorScheme={'red'} onClick={onSignUpOpen}>
                                Sign up
                            </Button>
                        </>
                    )
                ) : null}
            </HStack>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </Stack>
    );
}
