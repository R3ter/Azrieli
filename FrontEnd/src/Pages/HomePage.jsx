import { Center } from "@chakra-ui/react";
import Comp from "./Comp";
import SearchComp from "./SearchComp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        "x-access-token": JSON.parse(localStorage.getItem("credential")).token,
      },
    }).then(async (e) => {
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
