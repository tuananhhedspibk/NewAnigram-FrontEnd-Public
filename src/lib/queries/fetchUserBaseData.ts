import gql from 'graphql-tag';

export default gql`
  query UserQuery($id: ID!) {
    user(id: $id) {
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
    }
  }
`;
