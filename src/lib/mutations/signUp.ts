import gql from 'graphql-tag';

export default gql`
  mutation SignUp($email: String, $password: String) {
    signUp(email: $email, password: $password) {
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
