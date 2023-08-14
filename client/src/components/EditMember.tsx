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
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import CREATE_MOVIE from "../graphql/mutations/CREATE_MOVIE";
import MultiSelectMenu from "./MultiSelectComp";
import Genres from "../util/Genres";
import UPDATE_MOVIE from "../graphql/mutations/UPDATE_MOVIE";
import { MdBuild } from "react-icons/md";
import UPDATE_MEMBER from "../graphql/mutations/UPDATE_MEMBER";

export default function ({
  refetch,
  memberData: { name, email, id, city },
}: {
  refetch: Function;
  memberData: {
    id: string;
    name: string;
    email: string;
    city: string;
  };
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {}, []);
  const toast = useToast();
  const form = useRef({ name, email, city });

  const [mutate, { loading }] = useMutation(UPDATE_MEMBER, {
    onCompleted: (data) => {
      if (data.EditMember.result) {
        refetch();
        onClose();
        toast({
          title: `Member was Updated!`,
          status: "success",
        });
      } else {
        toast({
          title: `${data.EditMember.msg}!`,
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
        leftIcon={<MdBuild />}
        variant="outline"
        width="200px"
        colorScheme="blue"
        onClick={onOpen}
      >
        Edit
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
                defaultValue={form.current.name}
                onChange={(e) => (form.current.name = e.target.value)}
                ref={initialRef}
                placeholder="Member's name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                defaultValue={form.current.email}
                onChange={(e) => (form.current.email = e.target.value)}
                placeholder="Member's email"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>City</FormLabel>
              <Input
                defaultValue={form.current.city}
                onChange={(e) => (form.current.city = e.target.value)}
                placeholder="Member's city"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={loading}
              onClick={() => {
                mutate({ variables: { id, data: { ...form.current } } });
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
