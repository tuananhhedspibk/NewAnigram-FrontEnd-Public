import gql from 'graphql-tag';

export default gql`
  mutation genS3PutURL($key: String!, $contentType: String!) {
    s3PutURL(key: $key, contentType: $contentType) {
      url
      result
    }
  }
`;
