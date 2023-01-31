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
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";
import { useState } from "react";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>(["rooms", roomPk], getRoom);
  const { data: reviewsData } = useQuery<IReview[]>(
    ["rooms", roomPk, "reviews"],
    getRoomReviews
  );

  return (
    <Box pb={40} px={{ base: 10, lg: 40 }} mt={10}>
      <Skeleton height="43px" width="25%" isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        mt={8}
        gap={2}
        rounded="xl"
        overflow="hidden"
        height="50vh"
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map(index => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow="hidden"
            key={index}
          >
            <Skeleton isLoaded={!isLoading} h="full" w="full">
              {data?.photos && data.photos.length > 4 ? (
                <Image
                  w="full"
                  h="full"
                  objectFit="cover"
                  src={data?.photos[index].file}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <Grid gap={20} templateColumns={"2fr 1fr"}>
        <Box>
          <HStack justifyContent="space-between" mt={10} w="60%">
            <VStack alignItems="flex-start">
              <Skeleton height="30px" isLoaded={!isLoading}>
                <Heading fontSize="2xl">
                  House hosted by {data?.owner.name}
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} height={"30px"}>
                <HStack justifyContent="flex-start" w="full">
                  <Text>
                    {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}
                  </Text>
                  <Text>•</Text>
                  <Text>
                    {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                  </Text>
                </HStack>
              </Skeleton>
            </VStack>
              <Avatar
                name={data?.owner.name}
                size="lg"
                src={data?.owner.avatar}
              />
          </HStack>
          <Box mt={10}>
            <Heading mb={5} fontSize="2xl">
              <HStack>
                <FaStar /> <Text>{data?.rating}</Text> 
                <Text>•</Text>
                <Text>
                  {reviewsData?.length} review
                  {reviewsData?.length === 1 ? "" : "s"}
                </Text>
              </HStack>
            </Heading>
            <Container mt={16} maxW="container.lg" marginX="none">
            <Grid mt={16} gap={10} templateColumns={"1fr 1fr"}>
              {reviewsData?.map((review, index) => (
                <VStack alignItems="flex-start" key={index}>
                  <HStack>
                    <Avatar
                      name={review.user.name}
                      src={review.user.avatar}
                      size="md"
                    />
                    <VStack spacing={0} alignItems="flex-start">
                      <Heading fontSize={"md"}>{review.user.name}</Heading>
                      <HStack spacing={1}>
                        <FaStar size="12px" />
                        <Text>{review.rating}</Text>
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
  );
}
