import { gql } from "@apollo/client";

export default gql`
  mutation MyMutation2($id: String!) {
    RemoveMember(id: $id)
  }
`;
