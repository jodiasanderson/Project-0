import React, { FunctionComponent, SyntheticEvent } from 'react'
import Axios from 'axios'
import { Grid, makeStyles, Container } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { TitleComponent } from '../TitleComponent/TitleComponent'
import { Redirect } from 'react-router'


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

export const LogoutComponent: FunctionComponent<any> = (props) => {
    const classes = useStyles();

    let userSession = 'http://localhost:2020/logout'

    console.log(userSession);

    const logoutUser = async (e: SyntheticEvent) => {

        Axios.delete(userSession)

        props.history.push(`/login`)
    } 

//${props.user.username}
    return (
      
             <div>
            <Container maxWidth="lg" className={classes.container}>
            <form className={classes.form} autoComplete="off" onSubmit={ logoutUser}>
                <Grid container spacing={10}>
                    <Grid item xs={12} sm={6} md={12} lg={4} className={classes.grid}>
                    <TitleComponent size='large' title={`Are you sure you want to sign out of your account?`} />
            <Button className={classes.submit} type='submit' variant="contained" color="secondary">SIGN OUT</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    </div>
    
)
}