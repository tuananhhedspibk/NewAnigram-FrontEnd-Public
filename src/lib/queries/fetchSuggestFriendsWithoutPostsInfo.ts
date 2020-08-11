import gql from 'graphql-tag';

export default gql`
  query FetchSuggestFriends($limit: Int) {
    suggestFriends(limit: $limit) {
      message
      result
      users {
        id,
        userName,
        avatarURL,
        followers,
        following,
      }
    }
  }
`;
