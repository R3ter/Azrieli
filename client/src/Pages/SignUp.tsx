import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useState, useRef, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import ADD_ACCOUNT from "../graphql/mutations/ADD_ACCOUNT";
import { login } from "../../context/userConext";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("credential")) {
      navigate("/");
    }
  });
  const [mutate, { loading }] = useMutation(ADD_ACCOUNT, {
    onCompleted(e) {
      if (!e.addAccount.error) {
        login(e.addAccount.token, e.addAccount.name);
        navigate("/");
      } else {
        setErr(e.addAccount.msg);
      }
    },
  });
  const form = useRef({ firstName: "", lastName: "", password: "", email: "" });
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
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features
          </Text>
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
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    onChange={(e) => {
                      form.current.firstName = e.target.value;
                    }}
                    type="text"
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    onChange={(e) => {
                      form.current.lastName = e.target.value;
                    }}
                    type="text"
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                onChange={(e) => {
                  form.current.email = e.target.value;
                }}
                type="email"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  onChange={(e) => {
                    form.current.password = e.target.value;
                  }}
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={() => {
                  if (
                    !form.current.firstName ||
                    !form.current.email ||
                    !form.current.password ||
                    !form.current.lastName
                  ) {
                    setErr("all inputs are required!");
                    return;
                  }
                  mutate({
                    variables: {
                      userData: {
                        username: form.current.email,
                        password: form.current.password,
                        name:
                          form.current.firstName + " " + form.current.lastName,
                      },
                    },
                  });
                }}
                loadingText="Submitting"
                isLoading={loading}
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign up
              </Button>
            </Stack>
            <p style={{ color: "red" }}>{err}</p>
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
            <Stack pt={6}>
              <Text align={"center"} color={"blue.400"}>
                Already a user? <Link to="/Login">Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
