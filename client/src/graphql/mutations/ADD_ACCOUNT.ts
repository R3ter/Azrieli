import { gql } from "@apollo/client";

export default gql`
  mutation MyMutation($userData: RegisterData!) {
    addAccount(userData: $userData) {
      error
      msg
      name
      token
    }
  }
`;
