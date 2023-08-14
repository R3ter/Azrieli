import { gql } from "@apollo/client";

export default gql`
  mutation MyMutation($data: memberInput!, $id: String!) {
    EditMember(data: $data, id: $id) {
      msg
      result
    }
  }
`;
