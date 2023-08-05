import {
  Badge,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Comp({ movie }) {
  const [isLoading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  return (
    <Stack
      borderWidth="1px"
      borderRadius="lg"
      w={{ sm: "100%", md: "540px" }}
      height={{ sm: "476px", md: "20rem" }}
      direction={{ base: "column", md: "row" }}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      padding={4}
    >
      <Flex flex={1} bg="blue.200">
        <Image objectFit="cover" boxSize="100%" src={movie.image} />
      </Flex>
      <Stack
        flex={1}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={1}
        pt={2}
      >
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {movie.name}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
          @john-Wick
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {movie.about}
        </Text>
        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #Action
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #Fight
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #Thriller
          </Badge>
        </Stack>

        <Stack
          width={"100%"}
          mt={"2rem"}
          direction={"row"}
          padding={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Button
            disabled={isLoading}
            onClick={() => {
              setLoading(true);
              fetch("http://localhost:8000/api/auth/sendCode", {
                headers: {
                  "x-access-token": JSON.parse(
                    localStorage.getItem("credential")
                  ).token,
                  "Content-Type": "application/json",
                },
              }).then(() => {
                setOpen(true);
              });
            }}
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"blue.400"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
          >
            {!isLoading ? "Subscribe" : <Spinner />}
          </Button>
        </Stack>
      </Stack>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
          setLoading(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>verify code</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>The code was sent to the email you signed up with.</Text>
            <Divider size={10} margin={10} />
            <Center>
              <HStack>
                <PinInput onComplete={(e) => {}}>
                  <PinInputField autoFocus />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
