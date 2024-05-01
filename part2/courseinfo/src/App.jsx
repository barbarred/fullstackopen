const Header = ({coursename}) => {

    return(
      <h2>{coursename}</h2>
    )
  }

const Content = ({parts}) => {
  return(
    parts.map(part => 
      <p key={part.id}>{part.name} {part.exercises}</p>
    )
  )
}

const Part = ({part}) => {
  return(
    <p>
      {part.name}{part.exercises}
    </p>
  )
}

const TotalExercises = ({parts}) => {

  let sum = parts.map((item) => item.exercises).reduce((prev, curr) => prev + curr, 0)
  return(
    <p>Total of exercises {sum}</p>
  )
}

const Course = ({courses}) => {
  return(
    courses.map(course =>
      <>
      <Header key={course.id} coursename={course.name} />
      <Content parts={course.parts} />
      </>
      
    )
  )
}

function App() {
  
    const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return (
    <>
      <Course courses={courses}/>
    </>
  )
}

export default App
