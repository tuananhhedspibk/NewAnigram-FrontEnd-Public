import gql from 'graphql-tag';

export default gql`
  mutation CommentPost($postId: ID!, $commentContent: String!) {
    commentPost(postId: $postId, commentContent: $commentContent) {
      message
      result
    }
  }
`;
