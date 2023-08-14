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

export default function ({
  refetch,
  movieData: { ImageUrl, genres: oldGenres, id, name, yearPremiered },
}: {
  refetch: Function;
  movieData: {
    id: string;
    ImageUrl: string;
    name: string;
    yearPremiered: number;
    genres: string[];
  };
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {}, []);
  const toast = useToast();
  const form = useRef({ name, ImageUrl, yearPremiered });
  const genres = useRef(oldGenres);
  const [image, setImage] = useState(ImageUrl);
  const [mutate, { loading }] = useMutation(UPDATE_MOVIE, {
    onCompleted: (data) => {
      if (data.EditMovie.result) {
        refetch();
        onClose();
        toast({
          title: `Movie was Updated!`,
          status: "success",
        });
      } else {
        toast({
          title: `${data.EditMovie.msg}!`,
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
        flex={1}
        fontSize={"sm"}
        rounded={"full"}
        bg={"blue.400"}
        color={"white"}
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
          <ModalHeader>Edit Movie</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Image
              src={image}
              width={400}
              height={400}
              objectFit="cover"
              alt="Wrong url"
            />
            <FormControl>
              <FormLabel>name</FormLabel>
              <Input
                onChange={(e) => (form.current.name = e.target.value)}
                ref={initialRef}
                defaultValue={name}
                placeholder="Movie name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>ImageUrl</FormLabel>
              <Input
                type="url"
                onChange={(e) => {
                  setImage(e.target.value);
                  form.current.ImageUrl = e.target.value;
                }}
                placeholder="Https://example.com/image.jpg"
                defaultValue={ImageUrl}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Premiered year</FormLabel>
              <Input
                type="number"
                onChange={(e) => (form.current.yearPremiered = +e.target.value)}
                placeholder="Premiered year"
                defaultValue={yearPremiered}
              />
            </FormControl>
            <MultiSelectMenu value={genres} label="Genres" options={Genres} />
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={loading}
              onClick={() => {
                mutate({
                  variables: {
                    id,
                    data: { ...form.current, genres: genres.current },
                  },
                });
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
