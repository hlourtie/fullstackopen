import React from "react";
const Content = ({persons}) => {
	console.log(persons)
	return (persons.map((element, index) => <Persons key={index} name={element.name} />))  
}
const Persons = ({name}) => (<><p>{name}</p></>)

export default Content;