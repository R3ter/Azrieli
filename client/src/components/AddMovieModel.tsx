import { useMutation } from "@apollo/client";
import { AddIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import CREATE_MOVIE from "../graphql/mutations/CREATE_MOVIE";

export default function ({ refetch }: { refetch: Function }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const form = useRef({ name: "", email: "", city: "" });
  const [mutate, { loading }] = useMutation(CREATE_MOVIE, {
    onCompleted: (data) => {
      if (data.createMovie.result) {
        refetch();
        onClose();
        form.current = { name: "", email: "", city: "" };
        toast({
          title: `Movie was created!`,
          status: "success",
        });
      } else {
        toast({
          title: `${data.createMovie.msg}!`,
          status: "error",
        });
      }
    },
  });
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button
        onClick={onOpen}
        size="md"
        border="2px"
        rightIcon={<AddIcon />}
        borderColor="green.500"
        bgColor={"green.700"}
        margin={10}
      >
        Create Member
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create member</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>name</FormLabel>
              <Input
                onChange={(e) => (form.current.name = e.target.value)}
                ref={initialRef}
                placeholder="Member's name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>awdawd</FormLabel>
              <Input
                type="url"
                onChange={(e) => (form.current.email = e.target.value)}
                placeholder="Member's email"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>City</FormLabel>
              <Input
                onChange={(e) => (form.current.city = e.target.value)}
                placeholder="Member's city"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={loading}
              onClick={() => {
                mutate({ variables: { memberInput: { ...form.current } } });
              }}
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
