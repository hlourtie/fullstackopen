import React from "react";

const Persons = ({name, number, id, action}) => (<><p>{name} {number} <button type="button" name={id} value={id} onClick={action}>delete</button></p></>)

export default Persons;