import React from "react";
import Persons from "./Persons";
const Content = ({persons}) => {
	return (persons.map((element) => <Persons key={element.id} name={element.name} number={element.number}/>))  
}
export default Content;