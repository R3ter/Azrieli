import { gql } from "@apollo/client";

export default gql`
  mutation MyMutation($movieInput: movieInput!) {
    createMovie(movieInput: $movieInput) {
      msg
      result
    }
  }
`;
