import { gql } from "@apollo/client";

export default gql`
  query MyQuery {
    getAllMembers {
      _id
      city
      email
      name
    }
  }
`;
