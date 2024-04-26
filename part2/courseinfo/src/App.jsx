
const Header = (props) => {
    
    return(
      <h1>{props.course.name}</h1>
    )
  }

const Part = (props) => {
  return(
     <p>{props.part} {props.exercise}</p>
  )
}

const Content = (props) => {

  const exercices = props.course.parts.reduce((sum, val) => sum + val.exercises, 0)

  return(
    <>
      <Part part={props.course.parts[0].name} exercise={props.course.parts[0].exercises}/>
      <Part part={props.course.parts[1].name} exercise={props.course.parts[1].exercises}/>
      <Part part={props.course.parts[2].name} exercise={props.course.parts[2].exercises}/>
      <Part part={props.course.parts[3].name} exercise={props.course.parts[3].exercises}/>
      <p>Total of {exercices} exercises </p>
    </>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
  )
}

const Course = ({course}) => {
  return(
    <>
      <Header course={course}/>
      <Part course={course}/>
      <Content course={course}/>
    </>
  )
}

function App() {
  
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of component',
        exercises: 14
      },
      {
        name: 'Redux',
        exercises: 11
      }
    ]
  }
  
  return (
    <>
      <Course course={course}/>
    </>
  )
}

export default App
