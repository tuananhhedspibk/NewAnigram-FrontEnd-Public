import gql from 'graphql-tag';

export default gql`
  query FetchNotifications {
    notifications {
      id
      destUser
      follower
      image
      post
      type
      content
      read
      createdAt
    }
  }
`;
