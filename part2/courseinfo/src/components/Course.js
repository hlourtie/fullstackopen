import React from "react";

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

export default Course