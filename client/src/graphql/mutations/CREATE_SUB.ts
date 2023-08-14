import { gql } from "@apollo/client";

export default gql`
  mutation MyMutation($memberId: String!, $movieId: String!) {
    createSub(memberId: $memberId, movieId: $movieId)
  }
`;
