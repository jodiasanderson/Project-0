import React, { FunctionComponent, useState, SyntheticEvent } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { projectLogin } from '../../remote/project-0-api/project-login'
import {RouteComponentProps} from "react-router-dom"
import { Grid, makeStyles, Container } from '@material-ui/core'


//the interface called route component props just defines history match and location 
interface ILoginProps extends RouteComponentProps {
  changeCurrentUser:(newUser:any)=>void
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
export const LoginComponent:FunctionComponent<ILoginProps> = (props) => {
  const classes = useStyles();

    const [username, changeUsername] = useState('')// two bits of state from react
    const [password, changePassword] = useState('')// one for username, one for password
    // there used to be the user state here - now it is from props

    const updateUsername = (event:any) => {//callback for events
        event.preventDefault()//stop the default behaviour of the event
        changeUsername(event.currentTarget.value)//call the state changing function with new value from user
    }

    const updatePassword = (event:any) => {
        event.preventDefault()
        changePassword(event.currentTarget.value)
    }

    const loginSubmit = async (e:SyntheticEvent) => {//sythentic events are react interface for converting between the many different types of browser events
        e.preventDefault()
        let res = await projectLogin(username, password)
        props.changeCurrentUser(res)
        changePassword('')
        props.history.push('/clicker') //change path upon login here! USEFUL TO SEE AND EDIT PROFILE INFO
    }

    
   return (
        <div>
        <Container maxWidth="lg" className={classes.container}>
            <form className={classes.form} autoComplete="off" onSubmit={loginSubmit}>
                <Grid container spacing={10}>
                    <Grid item xs={12} sm={6} md={12} lg={4} className={classes.grid}>
                        
                        <TextField id="username" label="USERNAME" value={username} onChange={updateUsername} />
                        <TextField id="password" type='password' label="PASSWORD" value={password} onChange={updatePassword} />   
                        <Button className={classes.submit} type='submit' variant="contained" color="secondary">SIGN IN</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    </div>
)
}