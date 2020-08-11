import gql from 'graphql-tag';

export default gql`
  mutation genS3GetURL($key: String!) {
    s3GetURL(key: $key) {
      url
      result
    }
  }
`;
