import gql from 'graphql-tag';

export default gql`
  subscription CommentAdded($currentUserId: ID!) {
    commentAdded(currentUserId: $currentUserId) {
      comment {
        id
        content
        user {
          id
          userName
          avatarURL
        }
      }
      postId
    }
  }
`;
