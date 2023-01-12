import { Box, VStack, Image, Button, Grid, Text, HStack, useColorModeValue  } from "@chakra-ui/react";
import { FaStar, FaRegHeart} from "react-icons/fa";

export default function Room() {
    const gray = useColorModeValue("gray.600", "gray.300");
    return (
        <VStack alignItems={"flex-start"}>
                <Box position="relative" overflow={"hidden"} mb={2} rounded={"3xl"}>
                    <Image h="280" src="https://a0.muscache.com/im/pictures/prohost-api/Hosting-607458038229062130/original/1e20dfc7-ea12-44b2-a837-2bdcd8502133.jpeg?im_w=720" />
                    <Button variant={"unstyled"} position="absolute" top={0} right={0} color="white">
                        <FaRegHeart size="20px" />
                    </Button>
                </Box>
                <Box>
                    <Grid gap={2} templateColumns={"6fr 1fr"} >
                        <Text as="b" noOfLines={1} fontSize={"md"}>Ganggu-myeon,Yeongdeok-gun, North Gyeongsang Province, South Korea</Text>
                        <HStack spacing={1}>
                            <FaStar size={15} />
                            <Text>5.0</Text>
                        </HStack>
                    </Grid>
                    <Text fontSize={"sm"} color={gray} >Seoul, S. Korea</Text>
                </Box>
                <Text fontSize={"sm"} color={gray} ><Text as="b">$72</Text> / night</Text>
            </VStack>
    );
}