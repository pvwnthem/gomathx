import React from "react"

import Title from "./components/Title"
import ScrollDownChevron from "./components/ScrollDownChevron"


import './App.css'

function App() {

  return (
    <>
      <div className="w-screen h-screen background">
        <div className="flex flex-col w-full h-full items-center justify-center">
          <Title />
          <div className="bottom-container">
            <ScrollDownChevron />
          </div>
        </div>
      </div>
      
    </>
  )
}

export default App
