import gql from 'graphql-tag';

export default gql`
  query FetchPosts($orderBy: OrderByType, $fromIndex: Int) {
    fetchPosts(orderBy: $orderBy, fromIndex: $fromIndex) {
      posts {
        id
        content
        images {
          source
        }
        tags
        createdAt
        numberLikes
        beLiked
        comments {
          id
          content
          user {
            id
            userName
            avatarURL
          }
        }
        user {
          id
          avatarURL
          userName
        }
      }
      canLoadMore
    }
  }
`;
