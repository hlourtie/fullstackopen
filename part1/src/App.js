import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  // Components
  const Title = ({name}) => <><h1>{name}</h1></> ;
  const Button = ({handleClick, text}) => <><button onClick={handleClick} >{text}</button></> ;
  const Stats = ({text,value}) => <><p>{text} {value}</p></>
  //Click handlers
  const handleGoodClick = () => {
    setAll(all + 1);
    setGood(good + 1);
  }
  const handleNeutralClick = () => {
    setAll(all + 1);
    setNeutral(neutral + 1);
  }
  const handleBadClick = () => {
    setAll(all + 1);
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
      <Stats text="All" value={all} />
      <Stats text="Average" value={all !== 0 ?(good - bad)/all : 0} />
      <Stats text="Positive" value={(all !==0 ? good/all:0)*100+ "%"} />
    </div>
  )
}

export default App