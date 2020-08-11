import gql from 'graphql-tag';

export default gql`
  mutation MarkNotificationAsRead($id: ID!) {
    markNotificationAsRead(id: $id) {
      message
      result
    }
  }
`;
