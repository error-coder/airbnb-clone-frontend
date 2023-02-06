import { FaStar, FaHeart, FaRegHeart, FaCamera } from 'react-icons/fa';
import {
    Box,
    Button,
    Grid,
    HStack,
    Image,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

interface IRoomProps {
    pk: number;
    isOwner: boolean;
    imgUrl: string;
    name: string;
    city: string;
    country: string;
    rating: number;
    price: number;
}

export default function Room({
    pk,
    isOwner,
    imgUrl,
    name,
    rating,
    city,
    country,
    price,
}: IRoomProps) {
    const navigate = useNavigate();

    const gray = useColorModeValue('gray.600', 'gray.300');

    const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate(`/rooms/${pk}/photos`);
    };

    return (
        <Link to={`/rooms/${pk}`}>
            <VStack alignItems={'flex-start'} h="100%">
                <Box
                    flex={1}
                    w="100%"
                    overflow={'hidden'}
                    mb={3}
                    rounded="2xl"
                    position={'relative'}
                >
                    <Image w="100%" h="100%" objectFit={'cover'} src={imgUrl} />
                    <Button
                        variant={'unstyled'}
                        color="white"
                        top={0}
                        right={0}
                        position={'absolute'}
                        onClick={onCameraClick}
                    >
                        {isOwner ? (
                            <FaCamera size="20px" />
                        ) : (
                            <FaRegHeart size="20px" />
                        )}
                    </Button>
                </Box>

                <Box>
                    <Grid gap={2} templateColumns={'6fr 1fr'}>
                        <Text as="b" noOfLines={1} fontSize="md">
                            {name}
                        </Text>
                        <HStack
                            _hover={{ color: 'red.100' }}
                            spacing={1}
                            color="gray"
                        >
                            <FaStar size={15} />
                            <Text>{rating}</Text>
                        </HStack>
                    </Grid>

                    <Text fontSize={'sm'} color={gray}>
                        {city}, {country}
                    </Text>
                </Box>

                <Text fontSize={'sm'} color={gray}>
                    <Text as="b">${price}</Text> / night
                </Text>
            </VStack>
        </Link>
    );
}
