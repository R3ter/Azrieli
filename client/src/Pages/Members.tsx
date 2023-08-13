import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
  Heading,
  Spinner,
  Box,
  Center,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../context/userConext";
import { useQuery } from "@apollo/client";
import GET_ALL_MOVIES from "../graphql/queries/GET_ALL_MOVIES";
import SearchComp from "../components/SearchComp";
import { AddIcon, BellIcon, EmailIcon } from "@chakra-ui/icons";
import { MdBuild, MdCall } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidTrashAlt } from "react-icons/bi";
import GET_ALL_MEMBERS from "../graphql/queries/GET_ALL_MEMBERS";
import AddMemberModel from "../components/AddMemberModel";

interface IMember {
  name: string;
  email: string;
  city: string;
}
export default function () {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("credential")) {
      navigate("/login");
    }
  });
  const { data: members, loading, refetch } = useQuery(GET_ALL_MEMBERS);
  return (
    <div>
      <Center>
        <AddMemberModel refetch={refetch} />
      </Center>
      <div
        style={{ display: "flex", gap: 50, margin: "50px", flexWrap: "wrap" }}
      >
        {loading && <Spinner />}
        {members &&
          members.getAllMembers.map((member: IMember, index: number) => (
            <Member member={member} />
          ))}
      </div>
    </div>
  );
}
const Member = ({ member }: { member: IMember }) => {
  return (
    <Card size={"lg"} paddingInline={20} align="center">
      <CardHeader>
        <Heading size="md"> {member.name}</Heading>
      </CardHeader>
      <CardBody flexDir={"column"} display={"flex"} gap={4}>
        <Box
          display={"flex"}
          as="button"
          borderRadius="md"
          bg="blue.400"
          color="white"
          cursor={"default"}
          px={4}
          fontSize={17}
          padding={2}
        >
          <EmailIcon alignSelf={"center"} marginRight={2} />
          <Text>{member.email}</Text>
        </Box>
        <Box
          display={"flex"}
          as="button"
          borderRadius="md"
          bg="blue.400"
          color="white"
          cursor={"default"}
          px={4}
          padding={2}
        >
          <FaLocationDot fontSize={24} />
          <Text width={"80%"}>{member.city}</Text>
        </Box>
      </CardBody>
      <CardFooter display={"flex"} flexDir={"column"} gap={5}>
        <Button
          leftIcon={<MdBuild />}
          variant="outline"
          width="200px"
          colorScheme="blue"
        >
          Edit
        </Button>
        <Button leftIcon={<BiSolidTrashAlt size={20} />} colorScheme="red">
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
};
