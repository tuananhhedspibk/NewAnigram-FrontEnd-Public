import gql from 'graphql-tag';

export default gql`
  query FetchPost($id: String!) {
    post(id: $id) {
      id
      content
      images {
        source
      }
      tags
      beLiked
      createdAt
      numberLikes
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
  }
`;
