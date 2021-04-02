import React from 'react'
import { Link } from 'gatsby'
export default ({ program }) => (
  <div>
    <h3>
      <Link to={`/program/${program.slug}`}>{program.fullProgramName}</Link>
    </h3>

    {program.availableMethodsOfStudy &&
      program.availableMethodsOfStudy.map(tag => <p key={tag}>{tag}</p>)}
  </div>
)
