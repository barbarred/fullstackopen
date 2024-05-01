const Header = ({coursename}) => {

    return(
      <h2>{coursename}</h2>
    )
  }


const Part = ({part}) => {
  return(
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return(
    parts.map(part =>
      <Part key={part.id} part={part}/>
    )
  )
}

const TotalExercises = ({parts}) => {

  let sum = parts.map((item) => item.exercises).reduce((prev, curr) => prev + curr, 0)
  return(
    <p style={{fontWeight:'bold'}}>Total of exercises {sum}</p>
  )
}

export const Course = ({courses}) => {

  return(
    courses.map(course =>
      <>
      <Header key={course.id} coursename={course.name} />
      <Content parts={course.parts} />
      <TotalExercises parts={course.parts} />
      </>
      
    )
  )
}