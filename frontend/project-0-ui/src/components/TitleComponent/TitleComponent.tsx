import React, { FunctionComponent } from 'react';



interface ITitleComponentProps{
    title:string
    size:string
}

export const TitleComponent:FunctionComponent <ITitleComponentProps> = (props)=> {
    switch (props.size){
        case 'small':{
            return (
                <h6>{props.title} </h6>  
            );
        }   

    }
    return (
        <h3>
            {props.title}
        </h3>
    );
} 
//takes in title value from parent then displays
//this helps to be specific 