import React from 'react'

const Header = (props) => {
  return(
    <>
    <h1>{props.name}</h1>
    </>
  ) 
}
const Content = (props) => {
  return (
    <>
      <Part name={props.part1.name} number={props.part1.exercises}/>
      <Part name={props.part2.name} number={props.part2.exercises}/>
      <Part name={props.part3.name} number={props.part2.exercises}/>
    </>
  )
}

const Part = (props) =>(
  <>
  <p>
      {props.name} {props.number}
    </p>
  </>
)
const Total = (props) => {

  return(
    <>
    <p>Number of exercises {props.number1 + props.number2 + props.number3}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header  name={course} />
      <Content part1={part1} part2={part2} part3={part3}/>
      <Total number1={part1.exercises} number2={part2.exercises} number3={part3.exercises}/>
    </div>
  )
}

export default App