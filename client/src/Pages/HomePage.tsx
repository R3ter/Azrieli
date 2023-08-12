import { Center } from "@chakra-ui/react";
import SearchComp from "./SearchComp";
import Comp from "./Comp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../context/userConext";

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("credential")) {
      navigate("/login");
    }
  });
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/Movies", {
      headers: {
        "x-access-token": getToken(),
      },
    }).then(async (e: any) => {
      e = await e.json();
      console.log(e);
      setMovies(e);
    });
  }, []);
  return (
    <div>
      <br />
      <SearchComp />
      <br />
      <Center style={{ display: "flex", flexWrap: "wrap", gap: "50px" }}>
        {movies.map((movie) => (
          <Comp movie={movie} />
        ))}
      </Center>
    </div>
  );
}
