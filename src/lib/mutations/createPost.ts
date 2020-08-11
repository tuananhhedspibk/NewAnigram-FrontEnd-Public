import gql from 'graphql-tag';

export default gql`
  mutation CreatePost($id: String!, $content: String, $images: [String], $tags: [String]) {
    createPost(id: $id, content: $content, images: $images, tags: $tags) {
      message
      result
    }
  }
`;
