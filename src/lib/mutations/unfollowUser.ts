import gql from 'graphql-tag';

export default gql`
  mutation UnfollowUser($unfollowUserId: ID!) {
    unfollowUser(unfollowUserId: $unfollowUserId) {
      message
      result
    }
  }
`;
