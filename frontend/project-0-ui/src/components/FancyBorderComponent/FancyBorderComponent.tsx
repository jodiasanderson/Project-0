import React, { FunctionComponent } from 'react'
//container component displays whatever is in it around it...
export const FancyBorder:FunctionComponent<any> = (props) =>
{
    let fancyStyle ={
        border: '2px dashed pink', 
        margin: '2vw 2vh 2vw 2vh '
    }
    return (
        <div style ={fancyStyle}>
            {props.children}
        </div>
    )
}