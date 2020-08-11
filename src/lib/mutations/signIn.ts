import gql from 'graphql-tag';

export default gql`
  mutation SignIn($email: String, $password: String) {
    signIn(email: $email, password: $password) {
      user {
        id
        email
        avatarURL
        userName
        nickName
      }
      token
      message
      result
    }
  }
`;
