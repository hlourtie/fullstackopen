import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // Components
  const Title = ({name}) => <><h1>{name}</h1></> ;
  const Button = ({handleClick, text}) => <><button onClick={handleClick} >{text}</button></> ;
  const Stats = ({text,value}) => <><p>{text} {value}</p></>
  //Click handlers
  const handleGoodClick = () => {
    setGood(good + 1);
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }
  const handleBadClick = () => {
    setBad(bad + 1);
  }
  //app return
  return (
    <div>
      <Title name="Give Feedback" />
      <Button handleClick={handleGoodClick} text="Good"/>
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />
      <Title name="Statistics" />
      <Stats text="Good" value={good} />
      <Stats text="Neutral" value={neutral} />
      <Stats text="Bad" value={bad} />
    </div>
  )
}

export default App