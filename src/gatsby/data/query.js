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
  program: `{
    contentfulProgram(slug: { eq: $slug }) {
      fullProgramName
      description {
        json
      }
      heroImage {
        fluid(maxWidth: 400) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
      availableMethodsOfStudy
      creditHours
      monthsToComplete
      programTracks
      typeOfDegree
      whyMorganStateStats {
        title
        id
        statisticImage {
          fluid(maxWidth: 400) {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
        }
      }
      relatedSchoolCollege {
        program {
          slug
          metaDescription {
            metaDescription
          }
          heroImage {
            fluid {
              src
            }
          }
          fullProgramName
        }
      }
      programDetailUrl
      skillsAndJobs {
        json
      }
      careerDetails {
        json
      }
      carouselContent {
        id
        title
        description
        image {
          fluid(maxWidth: 800) {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
        }
      }
      testimonial {
        author
        quote {
          json
        }
        image {
          fluid(maxWidth: 800) {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
        }
      }
      metaDescription {
        internal {
          content
        }
      }
      relatedPrograms {
        fullProgramName
        id
        slug
        metaDescription {
          metaDescription
        }
        heroImage {
          fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
        }
      }
    }
  }`,
}
