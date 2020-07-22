import React, { FunctionComponent, useState } from 'react'
import Button from '@material-ui/core/Button'
import { TitleComponent } from '../TitleComponent/TitleComponent'
import { User } from '../../models/User'
import {Redirect } from 'react-router-dom'
import { Grid, makeStyles, Container } from '@material-ui/core'

interface ICLickerProps {
     user:User | null
}
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(0),
        },
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    grid: {
        padding: theme.spacing(8),
        margin: 'auto',
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        flexWrap: 'wrap',
  
    },
    fixedHeight: {
        height: 900,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(10),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: 'black',
        color: 'white',
        fontSize: 18,
    },
  }));

export const ClickerComponent: FunctionComponent<ICLickerProps> = (props) => {
    const classes = useStyles();


    const [clicks, changeClicks] = useState(0)// this is a function provided by react to allow us to keep track of data within the component
    //it returns 2 values, the first being the object that is state, 
    // the second thing is a fuinction that sets state to whatever the argurment of that function is
    //use state stakes in a single arguement, the initial state
    // the value clicks is immutable, it can only be changed using the function we got alongside

    return (
        (props.user)? //(props.user.role!=='Admin')? cool stuff
        <div>

            {/* By taking a value from state and embbeding it into the display we are doing something we call data binding 
            fundamental property of react web design*/}
            <TitleComponent size='large' title={`Welcome, ${props.user.username}`} />
            {/* when handling an event we need to provide a callback function, not a function call
            if you weant to call a specific function with a specific value when an event takes place
            wrap that function call in an anonymous function
            changeClicks(2) -- function call
            ()=>(changeClicks(2)) -- this is a fcuntion that calls changeClicks with a specific value */}
           
            <Container maxWidth="lg" className={classes.container}>
           
                <Grid container spacing={10}>
                    <Grid item xs={12} sm={6} md={12} lg={4} className={classes.grid}>
                    </Grid>
                </Grid>

        </Container>
            
        </div>
        :
        <Redirect to='/login'/>
    )


}