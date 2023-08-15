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
import React, { useRef, useState } from "react";
import CREATE_MOVIE from "../graphql/mutations/CREATE_MOVIE";
import MultiSelectMenu from "./MultiSelectComp";
import Genres from "../util/Genres";

export default function ({ refetch }: { refetch: Function }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const form = useRef({ name: "", ImageUrl: "", yearPremiered: 0 });
  const genres = useRef([]);
  const [image, setImage] = useState(
    "https://removal.ai/wp-content/uploads/2021/02/no-img.png"
  );
  const [mutate, { loading }] = useMutation(CREATE_MOVIE, {
    onCompleted: (data) => {
      if (data.createMovie.result) {
        setImage("https://removal.ai/wp-content/uploads/2021/02/no-img.png");
        refetch();
        onClose();
        form.current = { name: "", ImageUrl: "", yearPremiered: 0 };
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
        color={"white"}
      >
        Create Movie
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Movie</ModalHeader>
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
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Premiered year</FormLabel>
              <Input
                type="number"
                onChange={(e) => (form.current.yearPremiered = +e.target.value)}
                placeholder="Premiered year"
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
                    movieInput: { ...form.current, genres: genres.current },
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
