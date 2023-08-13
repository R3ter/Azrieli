import { gql } from "@apollo/client";

export default gql`
  query MyQuery {
    getAllMembers {
      city
      email
      name
    }
  }
`;
