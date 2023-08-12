import { gql } from "@apollo/client";

export default gql`
  mutation MyMutation($loginData: loginData!) {
    login(loginData: $loginData) {
      msg
      error
      name
      token
    }
  }
`;
