import React from 'react'
import styled from '@emotion/styled'
import Img from 'gatsby-image'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const RICHTEXT_OPTIONS = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p>{children}</p>
    },
    [INLINES.HYPERLINK]: (node, children) => {
      return (
        <a className="link" href={node.data.uri}>
          {children}
        </a>
      )
    },
  },
}

const Figure = styled.figure`
  width: 100%;
`

const Quote = styled.blockquote`
  position: relative;
  border: 1px solid red;
  border-radius: 2px;
  margin: 0 0 1em 0;
  width: 100%;
  transition: background 0.2s;
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    flex: ${props => (props.featured ? '0 0 100%' : '0 0 49%')};
    margin: 0 0 2vw 0;
  }
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    flex: ${props => (props.featured ? '0 0 100%' : '0 0 32%')};
  }
`

const StyledImg = styled(Img)`
  border: 5px solid #000;
`

const Author = styled.figcaption`
  font-size: 1.5em;
  font-weight: 600;
  text-transform: capitalize;
  margin: 1rem 1rem 0.5rem 1rem;
`

const Testimonial = ({ quote, author, image, ...props }) => {
  return (
    <>
      {quote && (
        <Figure>
          <Quote>
            <StyledImg fluid={image.fluid} backgroundColor={'#eeeeee'} />
            {documentToReactComponents(quote.json, RICHTEXT_OPTIONS)}
            <Author>- {author}</Author>
          </Quote>
        </Figure>
      )}
    </>
  )
}

export default Testimonial
