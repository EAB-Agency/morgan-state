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

const Quote = styled.li`
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
  &:hover {
    background: green;
  }
`

const StyledImg = styled(Img)`
  border-top-left-radius: 1px;
  border-top-right-radius: 1px;
`

const Author = styled.h4`
  font-size: 1.5em;
  font-weight: 600;
  text-transform: capitalize;
  margin: 1rem 1rem 0.5rem 1rem;
`

const Testimonial = ({ quote, author, image, ...props }) => {
  console.log('quote, author, image', quote, author, image)
  return (
    <>
      {quote && (
        <Quote>
          <StyledImg fluid={image.fluid} backgroundColor={'#eeeeee'} />
          {documentToReactComponents(quote.json, RICHTEXT_OPTIONS)}
          <Author>-- {author}</Author>
        </Quote>
      )}
    </>
  )
}

export default Testimonial
