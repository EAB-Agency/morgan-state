import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import '@brainhubeu/react-carousel/lib/style.css'

import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Container from '../components/Container'
import PageBody from '../components/PageBody'
import TagList from '../components/TagList'
import PostLinks from '../components/PostLinks'
import SEO from '../components/SEO'
import Card from '../components/Card'
import CardList from '../components/CardList'
import Testimonial from '../components/Testimonial'
import ImageSlider from '../components/Slider'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import StatCard from '../components/StatCard'
import { Button } from '@theme-ui/components'
import ContactForm from '../components/Contact/ContactForm'

const carouselSettings = {
  dot: true,
  infinite: true,
  speed: 500,
  arrows: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  cssEase: 'linear',
}

const StatBlock = styled.div`
  padding: 1rem;
  background: lightblue;
  float: left;
  & span {
    display: block;
  }
`
const Description = styled.div`
  background: lightcoral;
`
const WhyMorganState = styled.div`
  background: lightcyan;
`
const SkillsAndJobs = styled.div`
  background: lightsteelblue;
`
const AchieveSuccess = styled.div`
  background: lightslategray;
`
const DiscoverProgramCTA = styled.div`
  background: lightskyblue;
`
const RelatedPrograms = styled.div`
  background: lightsalmon;
`
const CareerDetails = styled.div`
  background: lightpink;
`
const PreContentBlock = styled.div`
  background: plum;
`
const CarouselPreText = styled.div`
  background: grey;
`

const RICHTEXT_OPTIONS = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      return (
        <a className="link" href={node.data.uri}>
          {children}
        </a>
      )
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p>{children}</p>
    },
    [BLOCKS.LIST_ITEM]: (node, children) => {
      const UnTaggedChildren = documentToReactComponents(node, {
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => children,
          [BLOCKS.LIST_ITEM]: (node, children) => children,
        },
      })

      return <li>{UnTaggedChildren}</li>
    },
    [BLOCKS.EMBEDDED_ASSET]: node => {
      const { title, description, file } = node.data.target.fields
      const mimeType = file['en-US'].contentType
      const mimeGroup = mimeType.split('/')[0]
      switch (mimeGroup) {
        case 'image':
          return (
            <img
              title={title ? title['en-US'] : null}
              alt={description ? description['en-US'] : null}
              src={file['en-US'].url}
            />
          )
        default:
          return (
            <span style={{ backgroundColor: 'red', color: 'white' }}>
              {' '}
              {mimeType} embedded asset{' '}
            </span>
          )
      }
    },
  },
}

const ProgramTemplate = ({ data, pageContext }) => {
  const {
    title,
    metaDescription,
    heroImage,
    tags,
    fullProgramName,
    description,
    availableMethodsOfStudy,
    creditHours,
    monthsToComplete,
    programTracks,
    thumbnail,
    typeOfDegree,
    whyMorganStateStats,
    programDetailUrl,
    preContentBlock,
    skillsAndJobs,
    careerDetails,
    carouselPreText,
    carouselContent,
    testimonial,
    relatedPrograms,
  } = data.contentfulProgram
  const previous = pageContext.prev
  const next = pageContext.next
  const { basePath } = pageContext

  let ogImage
  try {
    ogImage = heroImage.ogimg.src
  } catch (error) {
    ogImage = null
  }

  const normalizedCarousel =
    carouselContent &&
    carouselContent.map(item => ({
      id: item.id,
      title: item.title,
      src: item.image.fluid.src,
      description: item.description,
    }))

  const normalizedRelated =
    relatedPrograms &&
    relatedPrograms.map(item => ({
      id: item.id,
      title: item.fullProgramName,
      src: item.thumbnail ? item.thumbnail.fixed.src : null,
      description: item.metaDescription
        ? item.metaDescription.metaDescription
        : null,
    }))

  return (
    <Layout>
      <SEO
        title={title}
        description={
          metaDescription ? metaDescription.metaDescription : 'Title Needed'
        }
        image={ogImage}
      />
      <Hero title={title} image={heroImage} height={'50vh'} />
      <Container>
        {tags && <TagList tags={tags} basePath={basePath} />}
        <PageBody body="xxxxxxxxx">
          <h1>
            {typeOfDegree} in {fullProgramName}
          </h1>
          <ul>
            {availableMethodsOfStudy &&
              availableMethodsOfStudy.map(method => (
                <>
                  <b>Learning Mode: </b>
                  <span key={method}>{method}</span>
                </>
              ))}
          </ul>
          {creditHours && (
            <StatBlock>
              <span>{creditHours}</span>
              Credit Hours
            </StatBlock>
          )}
          {monthsToComplete && (
            <StatBlock>
              <span>{monthsToComplete}</span>
              Months to Complete
            </StatBlock>
          )}
          {programTracks && (
            <StatBlock>
              <span>{programTracks}</span>
              Program Tracks
            </StatBlock>
          )}
          <h2>
            Change Your Future with a {typeOfDegree} in {fullProgramName}
          </h2>
          <Description>
            {description &&
              documentToReactComponents(description.json, RICHTEXT_OPTIONS)}
          </Description>
          <h2>Why Morgan State?</h2>
          <WhyMorganState>
            <CardList>
              {whyMorganStateStats &&
                whyMorganStateStats.map(node => (
                  <StatCard key={node.id} {...node} />
                ))}
            </CardList>
          </WhyMorganState>

          {preContentBlock && (
            <PreContentBlock>
              {documentToReactComponents(
                preContentBlock.json,
                RICHTEXT_OPTIONS
              )}
            </PreContentBlock>
          )}
          {skillsAndJobs && (
            <SkillsAndJobs>
              {/* <h2>Content block 1</h2> */}
              {documentToReactComponents(skillsAndJobs.json, RICHTEXT_OPTIONS)}
            </SkillsAndJobs>
          )}

          {careerDetails && (
            <CareerDetails>
              {/* <h2>Content block 2</h2> */}
              {documentToReactComponents(careerDetails.json, RICHTEXT_OPTIONS)}
            </CareerDetails>
          )}

          {carouselPreText && (
            <CarouselPreText>
              {documentToReactComponents(
                carouselPreText.json,
                RICHTEXT_OPTIONS
              )}
            </CarouselPreText>
          )}
          {normalizedCarousel && (
            <ImageSlider
              data={normalizedCarousel}
              settings={carouselSettings}
            />
          )}

          <AchieveSuccess>
            <h2>Achieve Success Like Our Alumni</h2>
            <p>
              Lorem ipsum dolor sit amet nunc diam curabitur pretium lectus non
              sodales. Ut risus a lacus curabitur turpis incididunt quisque quam
              aliquet. Est orci aliqua pharetra mi senectus quisque volutpat
              laoreet. Velit arcu facilisis enim eu curabitur quam augue
              sodales. At hac luctus aliqua mattis nullam semper neque posuere
              nisi dapibus nulla sollicitudin.
            </p>
          </AchieveSuccess>
          {testimonial && (
            <Testimonial
              image={testimonial.image}
              quote={testimonial.quote}
              author={testimonial.author}
            ></Testimonial>
          )}

          <DiscoverProgramCTA>
            <h3>
              Discover the {typeOfDegree} in {fullProgramName}
            </h3>
            <p>Lorem ipsum dolor sit amet ac urna ullamcorper nisi.</p>
            <Button>Request Information</Button>
            <ContactForm
              campaign="eab"
              program={`${typeOfDegree} in ${fullProgramName}`}
              sendToUrl={programDetailUrl}
            />
          </DiscoverProgramCTA>
          {normalizedRelated && (
            <RelatedPrograms>
              <h2>Explore Related Programs</h2>
              <ImageSlider
                data={normalizedRelated}
                settings={carouselSettings}
              />
            </RelatedPrograms>
          )}
        </PageBody>
      </Container>
      {/* <PostLinks
        previous={previous}
        next={next}
        basePath={`${basePath}/program`}
      /> */}
    </Layout>
  )
}

export const query = graphql`
  query ProgramPostBySlug($slug: String!) {
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
      programDetailUrl
      thumbnail {
        fixed {
          src
        }
      }
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
      programDetailUrl
      skillsAndJobs {
        json
      }
      preContentBlock {
        json
      }
      careerDetails {
        json
      }
      carouselPreText {
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
        metaDescription
      }
      relatedPrograms {
        fullProgramName
        id
        slug
        thumbnail {
          fixed {
            src
          }
        }
        typeOfDegree
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
  }
`

export default ProgramTemplate
