/** @format */

import React from 'react'

import './styles/Title.component.css'

import TitleText from './text/TitleText'
import DotSeperator from './DotSeperator'
import Description from './text/Description'

function Title() {
    return (
        <div className='flex flex-col items-center justify-center'>
            <TitleText />
            <DotSeperator />
            <Description />
        </div>
    )
}

export default Title
