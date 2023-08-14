import { gql } from "@apollo/client";

export default gql`
  mutation MyMutation($id: String!) {
    RemoveMovie(id: $id)
  }
`;
