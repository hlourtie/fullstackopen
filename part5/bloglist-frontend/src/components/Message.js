import React from "react"; 

const Message = ({message, className}) => {
	if (message === null){
		return null
	}
	return (<><table className={className}><tbody><tr><td>{message}</td></tr></tbody></table></>)
}


export default Message