import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate, useNavigation } from "react-router-dom";

export default function AddMovie() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const form = useRef({ name: "", date: "", image: "", about: "" });
  console.log(JSON.parse(localStorage.getItem("credential")).token);
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Add Movie
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="MovieNamme">
                  <FormLabel>Movie Name</FormLabel>
                  <Input
                    onChange={(e) => {
                      form.current.name = e.target.value;
                    }}
                    type="text"
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="Year">
                  <FormLabel>Relase Year</FormLabel>
                  <Input
                    onChange={(e) => {
                      form.current.year = e.target.value;
                    }}
                    placeholder="Select Date and Time"
                    size="md"
                    type="datetime-local"
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormLabel>Image Address </FormLabel>
            <InputGroup size="sm">
              <InputLeftAddon children="https://" />
              <Input
                onChange={(e) => {
                  form.current.image = e.target.value;
                }}
                placeholder="mysite"
              />
              <InputRightAddon children=".com" />
            </InputGroup>
            <FormLabel>About </FormLabel>
            <Input
              onChange={(e) => {
                form.current.about = e.target.value;
              }}
              placeholder="about the moive"
            />
            <Stack spacing={10} pt={2}>
              <Button
                onClick={() => {
                  fetch("http://localhost:8000/api/Movies", {
                    method: "post",
                    body: JSON.stringify({
                      name: form.current.name,
                      year: form.current.year,
                      about: form.current.about,
                      image: form.current.image,
                    }),
                    headers: {
                      "x-access-token": JSON.parse(
                        localStorage.getItem("credential")
                      ).token,
                      "Content-Type": "application/json",
                    },
                  }).then(() => {
                    navigate("/");
                  });
                }}
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Add Movie
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
