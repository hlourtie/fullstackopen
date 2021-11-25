import React from "react";
const Content = ({persons}) => {
	return (persons.map((element) => <Persons key={element.id} name={element.name} number={element.number}/>))  
}
const Persons = ({name, number}) => (<><p>{name} {number}</p></>)

export default Content;