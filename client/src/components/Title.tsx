import React from 'react';

import '../styles/Title.component.css'

import TitleText from './text/TitleText';
import DotSeperator from './DotSeperator';
import Description from './text/Description';

function Title() {
    return (
        <>
            <TitleText />
            <DotSeperator />
            <Description />
        </>
    )
}

export default Title;