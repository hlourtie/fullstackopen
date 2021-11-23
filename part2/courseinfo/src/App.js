import React from 'react'
const Header = ({name}) => {
  return(
    <>
    <h1>{name}</h1>
    </>
  ) 
}
const Content = ({part}) => {
      return (part.map((element) => <Part key={element.id} name={element.name} number={element.exercises}/>))  
}

const Part = ({id, name, number}) =>(
  <><p> {name} {number}</p></>
)
const Course = ({course}) =>( 
<>
  <Header name={course.name} />
  <Content part={course.parts}/>
  <Total parts={course.parts}/>
</> )

const Total = ({parts}) => {
  let initialValue = 0;

  return(
    <>
    <p><b>Number of {parts.reduce((prevVal,currentVal) => (prevVal + currentVal.exercises), initialValue)} exercises</b></p>
    </>
  )
}
const App = () => {
  const course = [
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
    <div>
      {course.map(element => <Course key={element.id} course={element} />)}
    </div>
  
  )
}
export default App