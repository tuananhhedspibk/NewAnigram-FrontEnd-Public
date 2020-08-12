import gql from 'graphql-tag';

export default gql`
  query IsFollowingUser($userId: ID!) {
    isFollowingUser(userId: $userId) {
      message
      result
    }
  }
`;
