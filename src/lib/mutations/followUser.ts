import gql from 'graphql-tag';

export default gql`
  mutation FollowUser($followingUserId: ID!) {
    followUser(followingUserId: $followingUserId) {
      message
      result
    }
  }
`;
