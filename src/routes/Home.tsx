import { FaRegHeart, FaStar } from "react-icons/fa";
import { Box, Button, Grid, HStack, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import Room from "../components/Room";

export default function Home(){
    return ( 
        <Grid mt={10} px={{base:10, lg:40,}} columnGap={4} rowGap={8} templateColumns={{sm:"1fr", md:"1fr 1fr", lg:"repeat(3, 1fr)", xl:"repeat(4, 1fr)", "2xl" : "repeat(5, 1fr)",}}>
            {[1,2,3,3,4,5,7,46,6,6,66,6,7,7,7,7,7,7,7].map((index) => (
                <Room key={index} />
            ))}
        </Grid>
    );
}