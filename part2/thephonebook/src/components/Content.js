import React from "react";
import Persons from "./Persons";
const Content = ({persons, clickHandler}) => {
	return (persons.map((element) => <Persons key={element.id} name={element.name} number={element.number} id={element.id} action={clickHandler}/>))  
}
export default Content;