import gql from 'graphql-tag';

export default gql`
  mutation UpdateUser(
    $id: ID!,
    $email: String,
    $password: String,
    $avatarURL: String,
    $userName: String,
    $nickName: String
  ) {
    updateUser(
      id: $id,
      email: $email,
      password: $password,
      avatarURL: $avatarURL,
      userName: $userName,
      nickName: $nickName
    ) {
      message
      result
    }
  }
`;
