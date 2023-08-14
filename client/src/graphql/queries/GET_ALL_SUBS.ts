import { gql } from "@apollo/client";

export default gql`
  query MyQuery {
    getAllSubs {
      createdAt
      member {
        _id
        city
        email
        name
      }
      movie {
        ImageUrl
        _id
        genres
        name
        yearPremiered
      }
    }
  }
`;
