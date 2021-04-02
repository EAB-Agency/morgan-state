import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'

import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Container from '../components/Container'
import PageBody from '../components/PageBody'
import TagList from '../components/TagList'
import PostLinks from '../components/PostLinks'
import SEO from '../components/SEO'
import CardList from '../components/CardList'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import StatCard from '../components/StatCard'

const CarouselContent = props => (
  <div id={props.id}>
    <img src={props.image.fluid.src} />
    <p>{props.description}</p>
  </div>
)

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
const CareerDetails = styled.div`
  background: lightpink;
`
const ResearchAndInternships = styled.div`
  background: lightsalmon;
`
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
    body,
    tags,
    fullProgramName,
    description,
    availableMethodsOfStudy,
    creditHours,
    monthsToComplete,
    programTracks,
    startDates,
    typeOfDegree,
    whyMorganStateStats,
    relatedSchoolCollege,
    programDetailUrl,
    skillsAndJobs,
    careerDetails,
    carouselContent,
    additionalResources,
    prefooterCtaCopy,
    applicationUrl,
    tuitionCalculatorUrl,
    iwc,
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

  return (
    <Layout>
      <SEO
        title={title}
        description={
          metaDescription
            ? metaDescription.internal.content
            : body.childMarkdownRemark.excerpt
        }
        image={ogImage}
      />
      <Hero title={title} image={heroImage} height={'50vh'} />
      <Container>
        {tags && <TagList tags={tags} basePath={basePath} />}
        <PageBody body={body}>
          <h1>{fullProgramName}</h1>
          <ul>
            {availableMethodsOfStudy &&
              availableMethodsOfStudy.map(method => <li>{method}</li>)}
          </ul>
          <StatBlock>
            <span>{creditHours}</span>
            Credit Hours
          </StatBlock>
          <StatBlock>
            <span>{monthsToComplete}</span>
            Months to Complete
          </StatBlock>
          <StatBlock>
            <span>{programTracks}</span>
            Program Tracks
          </StatBlock>
          <h2>
            Change Your Future with a {typeOfDegree} in {fullProgramName}
          </h2>
          <Description>
            {documentToReactComponents(description.json, RICHTEXT_OPTIONS)}
          </Description>
          <h2>Why Morgan State?</h2>
          <WhyMorganState>
            <CardList>
              {whyMorganStateStats.map(node => (
                <StatCard key={node.id} {...node} />
              ))}
            </CardList>
          </WhyMorganState>
          <h2>Move Forward in Your Professional Career</h2>
          <p>
            Lorem ipsum dolor sit amet eiusmod imperdiet libero incididunt eget
            volutpat aenean curabitur iaculis. Tristique faucibus condimentum
            sodales posuere luctus laoreet congue. Condimentum vel libero
            interdum quisque pharetra sed proin netus venenatis pretium molestie
            ac libero. Rhoncus nibh dapibus fringilla consequat eros lacinia
            vulputate eu. Nec dui urna rhoncus tempor phasellus elementum lectus
            nec posuere quam vel egestas.
          </p>
          <SkillsAndJobs>
            <h2>Learn In Demand Skills</h2>
            {documentToReactComponents(skillsAndJobs.json, RICHTEXT_OPTIONS)}
          </SkillsAndJobs>
          <CareerDetails>
            <h2>Get the job you want</h2>
            {documentToReactComponents(careerDetails.json, RICHTEXT_OPTIONS)}
          </CareerDetails>
          <ResearchAndInternships>
            <h2>Pursue Hands-on Research and Internships</h2>
            <p>
              Lorem ipsum dolor sit amet turpis cursus lacinia senectus volutpat
              magna nisi. Lacus at nec lobortis augue eros diam donec a enim
              mattis faucibus. Fames etiam semper eget sapien mauris risus porta
              hendrerit. Ornare porttitor fermentum feugiat erat sagittis vitae
              viverra vivamus venenatis. Fermentum urna ullamcorper aliquam
              feugiat justo ornare consectetur ultricies.
            </p>
            <ul>
              <li>
                Lorem ipsum dolor sit amet molestie nisl nunc integer gravida
                duis neque blandit habitasse consequat.{' '}
              </li>
              <li>
                Cras auctor mauris non iaculis do neque pretium turpis leo morbi
                lobortis leo velit a.
              </li>
              <li>
                Lorem ipsum dolor sit amet aenean imperdiet malesuada lobortis.
              </li>
            </ul>
          </ResearchAndInternships>
          {/* https://brainhubeu.github.io/react-carousel/docs/gettingStarted */}
          <Carousel
            plugins={[
              'centered',
              'arrows',
              {
                resolve: slidesToShowPlugin,
                options: {
                  numberOfSlides: 2,
                },
              },
            ]}
          >
            {carouselContent.map(node => (
              <CarouselContent {...node} />
            ))}
          </Carousel>
        </PageBody>
      </Container>
      <PostLinks previous={previous} next={next} basePath={basePath} />
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
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      availableMethodsOfStudy
      creditHours
      monthsToComplete
      programTracks
      startDates
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
        internal {
          content
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
      additionalResources {
        internal {
          content
        }
      }
      prefooterCtaCopy {
        internal {
          content
        }
      }
      applicationUrl
      tuitionCalculatorUrl
      metaDescription {
        internal {
          content
        }
      }
      iwc {
        iwcTitle
        iwcLocation
      }
      relatedPrograms {
        fullProgramName
        id
        slug
        heroImage {
          fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
            ...GatsbyContentfulFluid_tracedSVG
          }
        }
      }
    }
  }
`

export default ProgramTemplate
