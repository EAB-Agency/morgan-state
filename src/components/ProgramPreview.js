import React from 'react'
import { Link } from 'gatsby'
export default ({ program }) => {
  const slug = `/program/${program.slug}` || '/'
  const { fullProgramName, availableMethodsOfStudy } = program
  return (
    <div>
      <h3>
        <Link to={slug}>{fullProgramName}</Link>
      </h3>

      {availableMethodsOfStudy &&
        availableMethodsOfStudy.map(tag => <p key={tag}>{tag}</p>)}
    </div>
  )
}
