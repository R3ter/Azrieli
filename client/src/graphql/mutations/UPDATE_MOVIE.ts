import { gql } from "@apollo/client";

export default gql`
  mutation MyMutation($data: movieInput!, $id: String!) {
    EditMovie(data: $data, id: $id) {
      msg
      result
    }
  }
`;
