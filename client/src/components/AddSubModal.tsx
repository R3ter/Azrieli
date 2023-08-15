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
import React, { useRef, useState } from "react";
import SelectWithImage from "./SelectWithImage";
import { useMutation, useQuery } from "@apollo/client";
import GET_ALL_MOVIES from "../graphql/queries/GET_ALL_MOVIES";
import CREATE_SUB from "../graphql/mutations/CREATE_SUB";

export default ({
  memberId,
  selectedMemberId,
  refetch,
  subs,
}: {
  subs: any;
  refetch: Function;
  memberId: string;
  selectedMemberId: { current: string };
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const movieId = useRef("");
  const [error, setError] = useState("");
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [mutate, { loading: loadingMutate }] = useMutation(CREATE_SUB, {
    onCompleted: () => {
      onClose();
      refetch();
    },
  });
  const { loading, data: movies } = useQuery(GET_ALL_MOVIES);
  const arr = movies?.getAllMovies
    .filter(
      (e: any) =>
        !subs.find(
          (a: any) =>
            a.movie._id == e._id && a.member._id == selectedMemberId.current
        )
    )
    .map((e: any) => ({
      id: e._id,
      imageUrl: e.ImageUrl,
      label: e.name,
    }));
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
            ) : arr.length == 0 ? (
              <Text>this member has subscribed to all movies</Text>
            ) : (
              <SelectWithImage
                onChange={(e) => {
                  movieId.current = e;
                  setError("");
                }}
                arr={arr}
              />
            )}
            <Text color={"red.400"}>{error}</Text>
          </ModalBody>

          <ModalFooter>
            {arr?.length > 0 && (
              <Button
                onClick={() => {
                  if (!movieId.current) {
                    setError("select a movie!");
                    return;
                  }
                  setError("");
                  mutate({
                    variables: {
                      memberId: selectedMemberId.current,
                      movieId: movieId.current,
                    },
                  });
                  movieId.current = "";
                }}
                colorScheme="blue"
                mr={3}
                isLoading={loadingMutate}
              >
                Subscribe
              </Button>
            )}
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
