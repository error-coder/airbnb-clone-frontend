import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    GridItem,
    Heading,
    HStack,
    Image,
    Skeleton,
    SkeletonCircle,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getRoom, getRoomReviews } from '../api';
import { IReview, IRoomDetail } from '../types';
import { useState } from 'react';

export default function RoomDetail() {
    const { roomPk } = useParams();
    const { data: roomData, isLoading: isRoomLoading } = useQuery<IRoomDetail>(
        [`room`, roomPk],
        getRoom
    );
    const { data: reviewsData } = useQuery<IReview[]>(
        [`room`, roomPk, 'reviews'],
        getRoomReviews
    );

    return (
        <>
            <Box pb={40} px={{ base: 10, lg: 40 }} mt={10}>
                <Skeleton
                    isLoaded={!isRoomLoading}
                    w={isRoomLoading ? '30%' : 'unset'}
                    h={'43px'}
                >
                    <Heading>{roomData?.name}</Heading>
                </Skeleton>

                <Grid
                    templateRows={'1fr 1fr'}
                    templateColumns={'repeat(4, 1fr)'}
                    gap={3}
                    h="60vh"
                    mt={8}
                    overflow={'hidden'}
                    rounded="xl"
                >
                    {new Array(5).fill('').map((photo, i) => (
                        <GridItem
                            key={i}
                            colSpan={i === 0 ? 2 : 1}
                            rowSpan={i === 0 ? 2 : 1}
                        >
                            <Skeleton
                                isLoaded={!isRoomLoading}
                                w="100%"
                                h="100%"
                            >
                                {roomData?.photos[i]?.file ? (
                                    <Image
                                        w="100%"
                                        h="100%"
                                        objectFit={'cover'}
                                        src={roomData?.photos[i].file}
                                    />
                                ) : null}
                            </Skeleton>
                        </GridItem>
                    ))}
                </Grid>

                <Grid templateColumns={'2fr 1fr'} gap={20} maxW="container.lg">
                    <Box>
                        <HStack justifyContent={'space-between'} mt={10}>
                            <VStack alignItems={'flex-start'}>
                                <Skeleton isLoaded={!isRoomLoading}>
                                    <Heading fontSize={'2xl'}>
                                        House hosted by {roomData?.owner.name}
                                    </Heading>
                                </Skeleton>

                                <Skeleton isLoaded={!isRoomLoading}>
                                    <HStack
                                        justifyContent={'flex-start'}
                                        w="100%"
                                    >
                                        <Text>
                                            {roomData?.rooms} room
                                            {roomData?.rooms === 1 ? '' : 's'}
                                        </Text>
                                        <Text>•</Text>
                                        <Text>
                                            {roomData?.toilets} toilet
                                            {roomData?.toilets === 1 ? '' : 's'}
                                        </Text>
                                    </HStack>
                                </Skeleton>
                            </VStack>

                            <SkeletonCircle
                                isLoaded={!isRoomLoading}
                                w={24}
                                h={24}
                            >
                                <Avatar
                                    size={'xl'}
                                    src={roomData?.owner.avatar}
                                    name={roomData?.owner.name}
                                />
                            </SkeletonCircle>
                        </HStack>

                        <Box mt={10}>
                            <Heading mb={5} fontSize="2xl">
                                <HStack>
                                    <FaStar /> <Text>{roomData?.rating}</Text>
                                    <Text>•</Text>
                                    <Text>
                                        {reviewsData?.length} review
                                        {reviewsData?.length === 1 ? '' : 's'}
                                    </Text>
                                </HStack>
                            </Heading>

                            <Container
                                maxW="container.lg"
                                mt={16}
                                marginX="none"
                            >
                                <Grid gap={10} templateColumns={'1fr 1fr'}>
                                    {reviewsData?.map((review, i) => (
                                        <VStack key={i} alignItems="flex-start">
                                            <HStack>
                                                <Avatar
                                                    name={review.user.name}
                                                    src={review.user.avatar}
                                                    size="md"
                                                />
                                                <VStack
                                                    alignItems={'flex-start'}
                                                    spacing={0}
                                                >
                                                    <Heading fontSize={'md'}>
                                                        {review.user.name}
                                                    </Heading>

                                                    <HStack spacing={1}>
                                                        <FaStar size="12px" />
                                                        <Text>
                                                            {review.rating}
                                                        </Text>
                                                    </HStack>
                                                </VStack>
                                            </HStack>

                                            <Text>{review.payload}</Text>
                                        </VStack>
                                    ))}
                                </Grid>
                            </Container>
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </>
    );
}
