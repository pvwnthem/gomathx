/** @format */

import React from 'react'

import Title from './components/Title'
import ScrollDownChevron from './components/ScrollDownChevron'

import './App.css'
import { tools } from './constants/tools'
import ToolBox from './components/ToolBox'

function App() {
    return (
        <>
            <div className='w-screen h-screen background'>
                <div className='flex flex-col w-full h-full items-center justify-center'>
                    <Title />
                    <div className='bottom-container'>
                        <ScrollDownChevron />
                    </div>
                </div>
            </div>

            <div className='w-screen h-screen background'>
                <div className='grid grid-cols-3'>
                    {tools.map((tool) => {
                        return (
                            <ToolBox tool={tool} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default App
