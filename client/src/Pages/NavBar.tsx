import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getToken, logout } from "../../context/userConext";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLogin = getToken();
  console.log(isLogin);
  const navigate = useNavigate();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {isLogin ? (
            <Link to={"/"}>
              <Button
                bg={"blue.400"}
                color={"white"}
                width={"100%"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Home
              </Button>
            </Link>
          ) : (
            <Box></Box>
          )}
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              {!isLogin && (
                <>
                  <Link to={"/SignUP"}>
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      width={"100%"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      SignUP
                    </Button>
                  </Link>
                  <Link to={"/Login"}>
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      width={"100%"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      LogIn
                    </Button>
                  </Link>
                </>
              )}

              {isLogin && (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <div
                      onClick={(e) => {
                        logout();
                        navigate("/login");
                      }}
                    >
                      <MenuItem>Logout</MenuItem>
                    </div>
                  </MenuList>
                </Menu>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
}
