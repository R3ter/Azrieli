import { gql } from "@apollo/client";

export default gql`
  query MyQuery {
    getAllMovies {
      ImageUrl
      genres
      name
      yearPremiered
    }
  }
`;
