import gql from 'graphql-tag';

export default gql`
  mutation BatchMarkNotificationAsRead($ids: [ID]) {
    markNotificationAsReadByBatch(ids: $ids) {
      message
      result
    }
  }
`;
