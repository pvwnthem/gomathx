import React from 'react';

import '../styles/TitleText.component.css'

function TitleText() {
    return (
        <h1 className='flex'>
            <span className='go font-semibold text-7xl' >go</span>
            <span className='text-white font-semibold text-7xl' >math</span>
            <span className='go font-bold text-7xl'>X</span>
        </h1>
    )
}

export default TitleText;