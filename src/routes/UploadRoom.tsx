import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    Select,
    Text,
    Textarea,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { FaBed, FaMoneyBill, FaToilet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
    getAmenities,
    getCategories,
    IUploadRoomVariables,
    uploadRoom,
} from '../api';
import HostOnlyPage from '../components/HostOnlyPage';
import ProtectedPage from '../components/ProtectedPage';
import { IAmenity, ICategory, IRoomDetail } from '../types';

export default function UploadRoom() {
    const toast = useToast();
    const navigate = useNavigate();

    const mutation = useMutation(uploadRoom, {
        onSuccess: (data: IRoomDetail) => {
            toast({
                status: 'success',
                title: 'Room created',
                position: 'bottom-right',
            });
            navigate(`/rooms/${data.id}`);
        },
    });
    const { register, handleSubmit } = useForm<IUploadRoomVariables>();
    const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<
        IAmenity[]
    >(['amenities'], getAmenities);
    const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery<
        ICategory[]
    >(['categories'], getCategories);

    const onSubmit = (data: IUploadRoomVariables) => {
        mutation.mutate(data);
    };

    return (
        <ProtectedPage>
            <HostOnlyPage>
                <Box px={{ base: 10, lg: 40 }} pb={40} mt={10}>
                    <Container>
                        <Heading textAlign={'center'}>Upload Room</Heading>

                        <VStack
                            as="form"
                            onSubmit={handleSubmit(onSubmit)}
                            spacing={10}
                            mt={5}
                        >
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    type={'text'}
                                    {...register('name', { required: true })}
                                />
                                <FormHelperText>
                                    Write the name of your room.
                                </FormHelperText>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Country</FormLabel>
                                <Input
                                    type={'text'}
                                    {...register('country', { required: true })}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>City</FormLabel>
                                <Input
                                    type={'text'}
                                    {...register('city', { required: true })}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Input
                                    type={'text'}
                                    {...register('address', { required: true })}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon
                                        children={<FaMoneyBill />}
                                    />
                                    <Input
                                        type="number"
                                        {...register('price', {
                                            required: true,
                                        })}
                                        min={0}
                                    />
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Rooms</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon children={<FaBed />} />
                                    <Input
                                        type="number"
                                        {...register('rooms', {
                                            required: true,
                                        })}
                                        min={0}
                                    />
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Toilets</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon children={<FaToilet />} />
                                    <Input
                                        type="number"
                                        {...register('toilets', {
                                            required: true,
                                        })}
                                        min={0}
                                    />
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    {...register('description', {
                                        required: true,
                                    })}
                                />
                            </FormControl>

                            <FormControl>
                                <Checkbox
                                    {...register('pet_friendly', {
                                        required: true,
                                    })}
                                >
                                    Pet friendly?
                                </Checkbox>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Kind of room</FormLabel>
                                <Select
                                    {...register('kind', { required: true })}
                                    placeholder="Choose a kind"
                                >
                                    <option value="entire_place">
                                        Entire Place
                                    </option>
                                    <option value="private_room">
                                        Private Room
                                    </option>
                                    <option value="shared_room">
                                        Shared Room
                                    </option>
                                </Select>
                                <FormHelperText>
                                    What kind of room are you renting?
                                </FormHelperText>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Category</FormLabel>
                                <Select
                                    {...register('category', {
                                        required: true,
                                    })}
                                    placeholder="Choose a kind"
                                >
                                    {categoriesData?.map((category) => (
                                        <option
                                            key={category.pk}
                                            value={category.pk}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </Select>
                                <FormHelperText>
                                    What category describes your room?
                                </FormHelperText>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Amenities</FormLabel>

                                <Grid templateColumns={'1fr 1fr'} gap={5}>
                                    {amenities?.map((amenity) => (
                                        <Box key={amenity.pk}>
                                            <Checkbox
                                                value={amenity.pk}
                                                {...register('amenities', {
                                                    required: true,
                                                })}
                                            >
                                                {amenity.name}
                                            </Checkbox>
                                            <FormHelperText>
                                                {amenity.description}
                                            </FormHelperText>
                                        </Box>
                                    ))}
                                </Grid>
                            </FormControl>

                            {mutation.isError ? (
                                <Text color="red.500">
                                    Something went wrong
                                </Text>
                            ) : null}

                            <Button
                                type="submit"
                                isLoading={mutation.isLoading}
                                size="lg"
                                w="100%"
                                colorScheme={'red'}
                            >
                                Upload Room
                            </Button>
                        </VStack>
                    </Container>
                </Box>
            </HostOnlyPage>
        </ProtectedPage>
    );
}
