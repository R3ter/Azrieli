import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useRef, useState } from "react";
import { login } from "../../context/userConext";

export default function SimpleCard() {
  const form = useRef({ username: "", password: "" });
  const [error, setErr] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("credential")) {
      navigate("/homePage");
    }
  });
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                onChange={(e) => (form.current.username = e.target.value)}
                type="email"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                onChange={(e) => (form.current.password = e.target.value)}
                type="password"
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
              </Stack>
              <p style={{ color: "red" }}>{error}</p>
              <Button
                onClick={() => {
                  fetch("http://localhost:8000/api/auth/login", {
                    method: "post",
                    body: JSON.stringify({
                      password: form.current.password,
                      username: form.current.username,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }).then(async (e) => {
                    e = await e.json();
                    if (e.auth) {
                      login(e.token);
                      navigate("/Homepage");
                    } else {
                      setErr("Username Or Pasword are wrong");
                    }
                  });
                }}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
              <Link to="/SignUp">
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  width={"100%"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign Up
                </Button>
              </Link>
              <Button
                w={"full"}
                maxW={"md"}
                variant={"outline"}
                leftIcon={<FcGoogle />}
              >
                <Center>
                  <Text>Sign in with Google</Text>
                </Center>
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
