
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  if(!notification){
    style['display'] = 'none'
  }else{
    style['display'] = ''
  } 
  return (
    <div style={ style }>
      {notification}
    </div>
  )
}

export default Notification