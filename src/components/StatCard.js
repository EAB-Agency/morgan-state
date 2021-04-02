import React from 'react'
import styled from '@emotion/styled'
import Img from 'gatsby-image'

const Stat = styled.li`
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

const Title = styled.h2`
  font-size: 1.5em;
  font-weight: 600;
  text-transform: capitalize;
  margin: 1rem 1rem 0.5rem 1rem;
`

const StatCard = ({ statisticImage, title, ...props }) => {
  return (
    <>
      {statisticImage && (
        <Stat featured={props.featured}>
          <StyledImg fluid={statisticImage.fluid} backgroundColor={'#eeeeee'} />
          <Title>{title}</Title>
        </Stat>
      )}
    </>
  )
}

export default StatCard
