import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { SyntheticEvent } from "react";
import { FaCamera, FaRegHeart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface IRoomProps {
  pk: number;
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
  isOwner: boolean;
}

export default function Room({
  pk,
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
  isOwner,
}: IRoomProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  const navigate = useNavigate();

  const onCameraClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/rooms/${pk}/photos`);
  };

  return (
    <Link to={`/rooms/${pk}`}>
      <VStack alignItems="flex-start">
        <Box position="relative" overflow={"hidden"} mb={3} rounded="xl">
          {imageUrl ? (
            <Image objectFit={"cover"} minH="280" src={imageUrl} />
          ) : (
            <Box minH="280px" h="100%" w="100%" p={10} bg="green.400" />
          )}
          <Button
            variant="unstyled"
            color="white"
            position="absolute"
            top={0}
            right={0}
            onClick={onCameraClick}
          >
            {isOwner ? <FaCamera size={20} /> : <FaRegHeart size={20} />}
          </Button>
        </Box>
        <Box>
          <Grid templateColumns={"6fr 1fr"} gap={2}>
            <Text noOfLines={1} fontSize="md" as="b">
              {name}
            </Text>
            <HStack spacing={1}>
              <FaStar size={15} />
              <Text>{rating}</Text>
            </HStack>
          </Grid>
          <Text fontSize="sm" color={gray}>
            {city}, {country}
          </Text>
        </Box>
        <Text fontSize="sm" color={gray}>
          <Text as="b">${price}</Text> / night
        </Text>
      </VStack>
    </Link>
  );
}