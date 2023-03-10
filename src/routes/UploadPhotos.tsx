import {
    Box,
    Button,
    Container,
    FormControl,
    Heading,
    Input,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { createPhoto, getUploadURL, uploadImage } from '../api';
import HostOnlyPage from '../components/HostOnlyPage';
import ProtectedPage from '../components/ProtectedPage';

interface IForm {
    file: FileList;
}

interface IUploadURLResponse {
    pk: string;
    uploadURL: string;
}

export default function UploadPhotos() {
    const { register, handleSubmit, watch, reset } = useForm<IForm>();
    const { roomPk } = useParams();
    const toast = useToast();
    const createPhotoMutation = useMutation(createPhoto, {
        onSuccess: () => {
            toast({
                status: 'success',
                title: 'Image uploaded!',
                description: 'Feel free to upload more images',
                isClosable: true,
            });
            reset();
        },
    });
    const uploadImageMutation = useMutation(uploadImage, {
        onSuccess: ({ result }: any) => {
            if (roomPk) {
                createPhotoMutation.mutate({
                    roomPk,
                    description: 'some test description',
                    file: `https://imagedelivery.net/U7a1zvDTBfh1jFMRCafs9w/ef3bf559-e36a-4c1e-85ab-edc84f6d6e00/public`,
                });
            }
        },
    });
    const uploadURLMutataion = useMutation(getUploadURL, {
        onSuccess: (data: IUploadURLResponse) => {
            uploadImageMutation.mutate({
                uploadURL: data.uploadURL,
                file: watch('file'),
            });
        },
    });

    const onSubmit = () => {
        uploadURLMutataion.mutate();
    };

    return (
        <ProtectedPage>
            <HostOnlyPage>
                <Box
                    pb={40}
                    mt={10}
                    px={{
                        base: 10,
                        lg: 40,
                    }}
                >
                    <Container>
                        <Heading textAlign={'center'}>Upload a Photo</Heading>
                        <VStack
                            spacing={5}
                            mt={10}
                            as="form"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <FormControl>
                                <Input
                                    {...register('file')}
                                    type="file"
                                    accept="image/*"
                                />
                            </FormControl>
                            <Button
                                isLoading={
                                    createPhotoMutation.isLoading ||
                                    uploadImageMutation.isLoading ||
                                    uploadURLMutataion.isLoading
                                }
                                type="submit"
                                w="full"
                                colorScheme={'red'}
                            >
                                Upload photos
                            </Button>
                        </VStack>
                    </Container>
                </Box>
            </HostOnlyPage>
        </ProtectedPage>
    );
}
