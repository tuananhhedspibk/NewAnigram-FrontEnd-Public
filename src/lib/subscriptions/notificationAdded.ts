import gql from 'graphql-tag';

export default gql`
  subscription NotificationAdded($currentUserId: ID!) {
    notificationAdded(currentUserId: $currentUserId) {
      id
      destUser
      follower
      post
      image
      type
      content
      createdAt
    }
  }
`;
