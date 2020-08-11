import gql from 'graphql-tag';

export default gql`
  mutation ActiveAccount($uid: ID!, $key: String!) {
    activeAccount(uid: $uid, key: $key) {
      message
      result
      user {
        id
        email
        avatarURL
        userName
        nickName
      }
      token
    }
  }
`;
