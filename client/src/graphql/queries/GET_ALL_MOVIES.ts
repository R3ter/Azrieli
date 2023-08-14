import { gql } from "@apollo/client";

export default gql`
  query MyQuery($search: String) {
    getAllMovies(search: $search) {
      ImageUrl
      _id
      genres
      name
      yearPremiered
    }
  }
`;
