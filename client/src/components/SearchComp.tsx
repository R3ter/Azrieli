import { Button, Center, Text } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function SearchComp() {
  return (
    <Center style={{ display: "flex", flexWrap: "wrap", gap: "50px" }}>
      <Link to={"/AddMovie"} style={{ width: "50%" }}></Link>
      <Text style={{ display: "flex", gap: "10px" }}>
        Search{" "}
        <Input
          variant="outline"
          focusBorderColor="blue.500"
          placeholder="Search Movie"
          height="80%"
        />
      </Text>
    </Center>
  );
}
