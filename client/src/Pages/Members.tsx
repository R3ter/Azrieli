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
  Collapse,
  useDisclosure,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../context/userConext";
import { useMutation, useQuery } from "@apollo/client";
import GET_ALL_MOVIES from "../graphql/queries/GET_ALL_MOVIES";
import SearchComp from "../components/SearchComp";
import {
  AddIcon,
  BellIcon,
  DeleteIcon,
  EmailIcon,
  PlusSquareIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { MdBuild, MdCall, MdCheckCircle, MdSettings } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidTrashAlt } from "react-icons/bi";
import GET_ALL_MEMBERS from "../graphql/queries/GET_ALL_MEMBERS";
import AddMemberModel from "../components/AddMemberModel";
import EditMember from "../components/EditMember";
import REMOVE_MEMBER from "../graphql/mutations/REMOVE_MEMBER";
import AddSubModal from "../components/AddSubModal";
import GET_ALL_SUBS from "../graphql/queries/GET_ALL_SUBS";
import REMOVE_SUB from "../graphql/mutations/REMOVE_SUB";

interface IMember {
  name: string;
  email: string;
  city: string;
  _id: string;
}
export default function () {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("credential")) {
      navigate("/login");
    }
  });
  const { data: members, loading, refetch } = useQuery(GET_ALL_MEMBERS);
  const { data: subs, refetch: refetchSub } = useQuery(GET_ALL_SUBS);
  return (
    <div>
      <Center>
        <AddMemberModel refetch={refetch} />
      </Center>
      <Center
        style={{ display: "flex", gap: 50, margin: "50px", flexWrap: "wrap" }}
      >
        {loading ? (
          <Spinner />
        ) : (
          members &&
          members.getAllMembers.map((member: IMember, index: number) => (
            <Member
              refetchSub={refetchSub}
              subs={subs?.getAllSubs}
              refetch={refetch}
              member={member}
            />
          ))
        )}
      </Center>
    </div>
  );
}
const Member = ({
  member,
  refetch,
  subs,
  refetchSub,
}: {
  member: IMember;
  refetch: Function;
  refetchSub: Function;
  subs: any;
}) => {
  const memberId = useRef("");
  const [removeSub, { loading: loadingRemoveSub }] = useMutation(REMOVE_SUB);
  const [mutate, { loading: loadingRemove }] = useMutation(REMOVE_MEMBER, {
    variables: { id: member._id },
    onCompleted: () => {
      refetch();
      refetchSub();
    },
  });
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Card size={"lg"} paddingInline={20} align="center">
      <CardHeader>
        <Heading size="lg"> {member.name}</Heading>
      </CardHeader>
      <CardBody
        flexDir={"column"}
        display={"flex"}
        width={"100%"}
        textAlign={"center"}
        gap={4}
      >
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
          <Text width={"100%"}>{member.email}</Text>
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
        <EditMember
          memberData={{ ...member, id: member._id }}
          refetch={refetch}
        />
        <Button
          onClick={() => {
            mutate();
          }}
          isLoading={loadingRemove}
          leftIcon={<BiSolidTrashAlt size={20} />}
          colorScheme="red"
        >
          Remove
        </Button>
        <Button onClick={onToggle}>View Subscriptions</Button>
        <Collapse in={isOpen} animateOpacity>
          <Box
            maxWidth={"200"}
            p="10px"
            color="purple.400"
            bg="transparent"
            rounded="md"
            border={"1px"}
            shadow="md"
          >
            <List spacing={3}>
              {!subs ||
              subs.filter((e: any) => e.member._id === member._id).length ==
                0 ? (
                <Text>No Subscriptions</Text>
              ) : (
                subs
                  .filter((e: any) => e.member._id === member._id)
                  .map((e: any) => (
                    <ListItem>
                      <ListIcon
                        onClick={() => {
                          removeSub({
                            variables: { id: e._id },
                            onCompleted: () => refetchSub(),
                          });
                        }}
                        cursor={"pointer"}
                        as={loadingRemoveSub ? RepeatIcon : DeleteIcon}
                        color="red.500"
                      />
                      {e.movie.name}
                      <Text>
                        {new Date(e.createdAt * 1000).toLocaleString()}
                      </Text>
                    </ListItem>
                  ))
              )}
            </List>
          </Box>
          <AddSubModal
            subs={subs}
            refetch={refetchSub}
            memberId={member._id}
            selectedMemberId={memberId}
          />
        </Collapse>
      </CardFooter>
    </Card>
  );
};
