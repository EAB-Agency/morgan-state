import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
import ProgramPreview from '../components/ProgramPreview'

class ProgramIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const programs = get(this, 'props.data.allContentfulProgram.edges')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className="wrapper">
            <ul className="article-list">
              {programs.map(({ node: post }) => {
                return (
                  <li key={post.slug}>
                    <ProgramPreview program={post} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default ProgramIndex

export const pageQuery = graphql`
  query ProgramIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulProgram {
      edges {
        node {
          fullProgramName
          slug
          availableMethodsOfStudy
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
