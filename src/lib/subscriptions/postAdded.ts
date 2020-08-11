import gql from 'graphql-tag';

export default gql`
  subscription PostAdded($currentUserId: ID!) {
    postAdded(currentUserId: $currentUserId) {
      id
      content
      numberLikes
      numberComments
      tags
      images {
        source
      }
      user {
        id
        userName
        avatarURL
      }
      comments {
        id
      }
      createdAt
    }
  }
`;
