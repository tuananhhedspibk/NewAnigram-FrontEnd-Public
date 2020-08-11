import gql from 'graphql-tag';

export default gql`
  mutation SendActiveAccountEmail($email: String!) {
    sendActiveAccountEmail(email: $email) {
      message
      result
    }
  }
`;
