import React from 'react'
import { useSelector } from 'react-redux'

const Message = () => {
	const notification = useSelector(state => state.message)
	console.log('notification', notification)

	if (notification.cotent === null){
		return null
	}
	return (<><table className={notification.type}><tbody><tr><td>{notification.content}</td></tr></tbody></table></>)
}


export default Message