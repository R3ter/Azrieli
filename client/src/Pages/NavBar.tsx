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
  Tabs,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Badge,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getName, getToken, logout } from "../../context/userConext";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const isLogin = getToken();
  const navigate = useNavigate();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Tabs
            defaultIndex={
              location.pathname == "/"
                ? 0
                : location.pathname == "/members"
                ? 1
                : 2
            }
            position="relative"
            variant="unstyled"
          >
            {isLogin && (
              <TabList>
                <Tab
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Movies
                </Tab>
                <Tab
                  onClick={() => {
                    navigate("/members");
                  }}
                >
                  Members
                </Tab>
                <Tab>Subscriptions</Tab>
              </TabList>
            )}
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="blue.500"
              borderRadius="1px"
            />
          </Tabs>
          {isLogin && (
            <Text fontSize="xl" fontWeight="bold">
              <Badge ml="1" fontSize="0.8em" colorScheme="green">
                {getName()}
              </Badge>
            </Text>
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
                      <p>{getName()}</p>
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
