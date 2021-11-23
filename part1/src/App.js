import React from 'react'

const Header = (props) => {
  return(
    <>
    <h1>{props.name}</h1>
    </>
  ) 
}
const Content = (props) => {
  console.log(props);
  const arr = props.parts;
  console.log(arr);
  
  return (
    arr.map(element=>{
     return (<Part name={element.name} number={element.exercises} />)
    }) 
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
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header  name={course} />
      <Content parts={parts}/>
      <Total number1={parts[0].exercises} number2={parts[1].exercises} number3={parts[2].exercises}/>
    </div>
  )
}

export default App