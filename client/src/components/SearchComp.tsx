import {
  Button,
  Center,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function SearchComp({ refetch }: { refetch: Function }) {
  return (
    <Center style={{ display: "flex", flexWrap: "wrap", gap: "50px" }}>
      <Link to={"/AddMovie"} style={{ width: "50%" }}></Link>
      <Text style={{ display: "flex", gap: "10px" }}>
        <InputGroup>
          <InputLeftAddon children="Search" />
          <Input
            onChange={(e) => {
              refetch({ search: e.target.value });
            }}
            variant="outline"
            focusBorderColor="blue.500"
            placeholder="Search by title"
          />
        </InputGroup>
      </Text>
    </Center>
  );
}
