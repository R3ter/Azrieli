import { AddIcon } from "@chakra-ui/icons";
import {
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
  useDisclosure,
  Text,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import SelectWithImage from "./SelectWithImage";
import { useMutation, useQuery } from "@apollo/client";
import GET_ALL_MOVIES from "../graphql/queries/GET_ALL_MOVIES";
import CREATE_SUB from "../graphql/mutations/CREATE_SUB";

export default ({
  memberId,
  selectedMemberId,
}: {
  memberId: string;
  selectedMemberId: { current: string };
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState("");
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [mutate, { loading: loadingMutate }] = useMutation(CREATE_SUB);
  const { loading, data: movies } = useQuery(GET_ALL_MOVIES);
  return (
    <>
      <Button
        marginTop={"2"}
        width={"100%"}
        colorScheme="green"
        onClick={() => {
          onOpen();
          selectedMemberId.current = memberId;
        }}
        variant="outline"
        rightIcon={<AddIcon />}
      >
        Add sub
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select the movie</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {loading ? (
              <Spinner />
            ) : (
              <SelectWithImage
                onChange={(e) => {
                  console.log(e);
                }}
                arr={movies.getAllMovies.map((e) => ({
                  id: e._id,
                  imageUrl: e.ImageUrl,
                  label: e.name,
                }))}
              />
            )}
            <Text color={"red.400"}>{error}</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                setError("select a movie!");
                mutate({ variables: { memberId: selectedMemberId.current } });
              }}
              colorScheme="blue"
              mr={3}
              isLoading={loadingMutate}
            >
              Subscribe
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
