import { Center, Spinner } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../context/userConext";
import { useQuery } from "@apollo/client";
import GET_ALL_MOVIES from "../graphql/queries/GET_ALL_MOVIES";
import SearchComp from "../components/SearchComp";
import Comp from "../components/Comp";
import AddMovieModel from "../components/AddMovieModel";

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("credential")) {
      navigate("/login");
    }
  });
  const { data: movies, loading, refetch } = useQuery(GET_ALL_MOVIES);
  return (
    <div>
      <br />
      <SearchComp />
      <br />
      <Center>
        <AddMovieModel refetch={refetch} />
      </Center>
      <Center style={{ display: "flex", flexWrap: "wrap", gap: "50px" }}>
        {loading ? (
          <Spinner />
        ) : (
          movies.getAllMovies.map((movie: any) => <Comp movie={movie} />)
        )}
      </Center>
    </div>
  );
}
