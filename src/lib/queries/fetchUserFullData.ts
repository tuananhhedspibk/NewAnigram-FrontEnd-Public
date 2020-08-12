import gql from 'graphql-tag';

export default gql`
  query UserQuery($id: ID!) {
    user(id: $id) {
      email
      avatarURL
      userName
      nickName
      followings {
        id
        avatarURL
        userName
      }
      followers {
        id
        avatarURL
        userName
      }
      posts {
        id
        content
        tags
        images {
          source
        }
        comments {
          id
          content
          user {
            id
            userName
            avatarURL
          }
        }
        numberLikes
        createdAt
      }
    }
  }
`;
