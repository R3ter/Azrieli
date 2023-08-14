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
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import Genres, { GenresColor } from "../util/Genres";
import { useMutation } from "@apollo/client";
import REMOVE_MOVIE from "../graphql/mutations/REMOVE_MOVIE";
import EditMovie from "./EditMovie";

export default function Comp({
  movie,
  refetch,
}: {
  refetch: Function;
  movie: {
    id: string;
    ImageUrl: string;
    name: string;
    yearPremiered: number;
    genres: string[];
  };
}) {
  const [isOpen, setOpen] = useState(false);
  const [mutate, { loading }] = useMutation(REMOVE_MOVIE, {
    variables: { id: movie.id },
    onCompleted: () => refetch(),
  });
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
        <Image objectFit="cover" boxSize="100%" src={movie.ImageUrl} />
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

        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          Year Premiered: {movie.yearPremiered}
        </Text>
        <Stack
          className="removeScroll"
          wrap={"wrap"}
          align={"center"}
          justify={"center"}
          display={"flex"}
          overflowY={"scroll"}
          direction={"row"}
          maxHeight={"100px"}
        >
          {movie.genres.map((e: string) => {
            return (
              <Badge
                borderRadius={15}
                margin={1}
                padding={1}
                colorScheme={GenresColor[e] || "blue"}
              >
                {e}
              </Badge>
            );
          })}
        </Stack>

        <Stack
          width={"100%"}
          mt={"2rem"}
          direction={"row"}
          padding={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <EditMovie movieData={movie} refetch={refetch} />
          <Button
            isLoading={loading}
            onClick={() => {
              mutate();
            }}
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"red.400"}
            color={"white"}
          >
            Remove
          </Button>
        </Stack>
      </Stack>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>verify code</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>The code was sent to the email you signed up with.</Text>
            <Divider size={"10"} margin={10} />
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
