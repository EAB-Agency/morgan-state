module.exports.data = {
  tags: `{
    allContentfulTag {
      edges {
        node {
          slug
          post {
            id
          }
        }
      }
    }
  }`,
  programs: `{
    allContentfulProgram {
      edges {
        node {
          slug
        }
      }
    }
  }`,
}
