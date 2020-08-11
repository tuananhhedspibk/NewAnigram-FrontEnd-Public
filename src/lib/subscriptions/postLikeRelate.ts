import gql from 'graphql-tag';

export default gql`
  subscription PostLikeRelate($currentUserId: ID!) {
    postLikeRelate(currentUserId: $currentUserId) {
      postNumberLikes
      postId
      srcUserId
      beLiked
    }
  }
`;
