import { gql } from "@apollo/client";

export default gql`
  mutation MyMutation($memberInput: memberInput!) {
    createMember(memberInput: $memberInput) {
      msg
      result
    }
  }
`;
