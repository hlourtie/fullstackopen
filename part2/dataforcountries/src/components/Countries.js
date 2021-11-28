import React from "react";

const Country = ({name, action})=>{
return(<><p>{name} <button type="button" name={name} value={name} onClick={action}>show me</button></p></>)
}

export default Country;
