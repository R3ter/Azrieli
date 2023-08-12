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
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useRef, useState } from "react";
import { getToken, login } from "./../../context/userConext";
import { useMutation, useQuery } from "@apollo/client";
import LOGIN from "../graphql/mutations/LOGIN";
export default function SimpleCard() {
  const form = useRef({ username: "", password: "" });
  const navigate = useNavigate();
  const [mutate, { loading, data }] = useMutation(LOGIN);
  useEffect(() => {
    if (getToken()) {
      navigate("/");
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

              <p style={{ color: "red" }}>{data?.login?.msg || ""}</p>
              <Button
                isLoading={loading}
                onClick={() => {
                  mutate({
                    variables: {
                      loginData: {
                        password: form.current.password,
                        username: form.current.username,
                      },
                    },
                    onCompleted: (e) => {
                      console.log(e);
                      if (!e.login.error) {
                        login(e.login.token);
                        navigate("/");
                      }
                    },
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
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
