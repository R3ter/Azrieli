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
} from "@chakra-ui/react";
import React, { useState } from "react";
import SelectWithImage from "./SelectWithImage";

export default () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState("");
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <>
      <Button
        marginTop={"2"}
        width={"100%"}
        colorScheme="green"
        onClick={onOpen}
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
            <SelectWithImage
              arr={[
                { id: "daw", imageUrl: "adwwd", label: "dwaadwwad" },
                { id: "daw", imageUrl: "adwwd", label: "dwaadwwad" },
              ]}
            />
            <Text color={"red.400"}>{error}</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                setError("select movie!");
              }}
              colorScheme="blue"
              mr={3}
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
