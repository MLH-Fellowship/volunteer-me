import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import {
    Modal,
    ModelOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Button,
    Input,
    useDisclosure,
    ModalOverlay
} from '@chakra-ui/react';

import { createProject } from '../lib/db'

const AddProjectModal = () => {
    const initialRef = useRef();
    const { isOpen, onOpen, onClose } =
        useDisclosure();
    const { handleSubmit, register } =
        useForm();


const onCreateProject = (values) => {
    createProject(values);
    onClose();
};

return (
    <>
        <Button fontWeight="medium" maxW="200px" onClick={onOpen}>
            Add your First Project
        </Button>
        <Modal initialFocusRef={initialRef}
            isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleSubmit(onCreateProject)}>
                <ModalHeader fontWeight="bold">Add Project</ModalHeader>
            ModalCloseButton />
            <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            ref={initialRef}
                            placeholder="My Project"
                            name="project"
                            ref={register({
                                required: 'Required'
                            })}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Link</FormLabel>
                        <Input placeholder="https://website.com" name="url" ref={register({
                            required: 'Required'
                        })}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} mr={3} fontWeight="medium">
                        Cancel
                            </Button>
                    <Button
                        backgroundColor="#99FFFE"
                        color="#194D4C"
                        fontWeight="medium"
                        type="submit"
                    >
                        Create
                    </Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
        </>
    );
    };

    export default AddProjectModal;