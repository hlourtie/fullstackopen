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
  let num = 0;
  props.parts.forEach(element =>{num+= element.exercises})
  return(
    <>
    <p>Number of exercises {num}</p>
    </>
  )
}

const App = () => {
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
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header  name={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App