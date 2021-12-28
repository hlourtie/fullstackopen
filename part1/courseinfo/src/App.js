import React from 'react'
const Header = ({name}) => {
  return(
    <>
    <h1>{name}</h1>
    </>
  ) 
}
const Content = ({parts}) => {

      return (parts.map(element => <Part name={element.name} number={element.exercises}/>))
      
}

const Part = ({name, number}) =>(
  <><p>{name} {number}</p></>
)
const Course = ({course}) =>( 
<div>
  <Header name={course.name} />
  <Content part={course.parts}/>

</div> )
const Total = (props) => {

  return(
    <>
    <p>Number of exercises {props.number1 + props.number2 + props.number3}</p>
    </>
  )
}
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
}
export default App