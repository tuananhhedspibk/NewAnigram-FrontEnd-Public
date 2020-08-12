import gql from 'graphql-tag';

export default gql`
  query ConfirmPassword($candidatePassword: String!) {
    confirmPassword(candidatePassword: $candidatePassword) {
      message
      result
    }
  }
`;
