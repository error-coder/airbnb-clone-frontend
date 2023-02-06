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
    id: string;
    uploadURL: string;
}

export default function UploadPhotos() {
    const toast = useToast();
    const { register, handleSubmit, watch, reset } = useForm<IForm>();
    const { roomPk } = useParams();

    const uploadURLMutation = useMutation(getUploadURL, {
        onSuccess: (data: IUploadURLResponse) => {
            uploadImageMutation.mutate({
                uploadURL: data.uploadURL,
                file: watch('file'),
            });
        },
    });

    const uploadImageMutation = useMutation(uploadImage, {
        onSuccess: ({ result }: any) => {
            if (roomPk) {
                createPhotoMutation.mutate({
                    description: 'I love react',
                    file: result.variants[0],
                    roomPk,
                });
            }
        },
    });

    const createPhotoMutation = useMutation(createPhoto, {
        onSuccess: () => {
            toast({
                status: 'success',
                title: 'Image upladed!',
                description: 'Feel free to upload more images.',
            });
            reset();
        },
    });

    const onSubmit = () => {
        uploadURLMutation.mutate();
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
                            as="form"
                            onSubmit={handleSubmit(onSubmit)}
                            spacing={5}
                            mt={10}
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
                                    uploadURLMutation.isLoading ||
                                    uploadImageMutation.isLoading ||
                                    createPhotoMutation.isLoading
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
