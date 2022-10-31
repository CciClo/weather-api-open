import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Weather from './components/Weather'

function App() {
  const [ showPage, setShowPage ] = useState(false);
  const [isBackground, setIsBackground] = useState(false);
  
  return (
    <div className="App">
      <Weather showPage={showPage} setShowPage={setShowPage} isBackground ={isBackground}/>
      <div className={showPage? "hiden":"loader"}></div>
      <button className={showPage? "btn-background" : "hide"} onClick={() => setIsBackground(!isBackground)}>{isBackground? "Hide background" : "Show background"}</button>
    </div>
  )
}

export default App
