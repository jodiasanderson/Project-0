import React, { FunctionComponent, useState, SyntheticEvent } from 'react'
import TextField from '@material-ui/core/TextField'
import { useParams } from 'react-router'
import { User } from '../../models/User'
import { Grid, makeStyles, Container } from '@material-ui/core'
import {projectupdateUser} from '../../remote/project-0-api/project-edit-user'
import Button from '@material-ui/core/Button'


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

export const EditUserComponent: FunctionComponent<any> = (props) => {

    const classes = useStyles();

    const { userId } = useParams()
    const [username, changeUsername] = useState('')
    const[lastName, changeLastName] = useState('')
    const [firstName, changeFirstName] = useState('')
    const [password, changePassword] = useState('')
    const [confirmPassword, changeConfirmPassword] = useState('')
    const [email, changeEmail] = useState('')
    //let [image, changeImage] = useState(undefined)

    const updateUsername = (event: any) => {
        event.preventDefault()
        changeUsername(event.currentTarget.value)
    }

    const updatePassword = (event: any) => {
        event.preventDefault()
        changePassword(event.currentTarget.value)
    }

    const updatefirstName = (e:any) => {
        e.preventDefault()
        changeFirstName(e.currentTarget.value)
    }
   
    const updatelastName = (e:any) => {
        e.preventDefault()
        changeLastName(e.currentTarget.value)
    }

    const updateEmail = (event: any) => {
        event.preventDefault()

        changeEmail(event.currentTarget.value)
    }
    
    /*const updateImage = (e: any) => {
        let file: File = e.currentTarget.files[0]
        let reader = new FileReader()
    
        reader.readAsDataURL(file)
    
        reader.onload = () => {
          console.log(reader.result)
          changeImage(reader.result)
        }
      }*/

    const updateUser= async (e: SyntheticEvent) => {
        e.preventDefault()
       //console.log(image);
        
        let updatedUser:User = {
            userId,
            username,
            password,
            firstName, 
            lastName, 
            email,
            role:'User'
            //image
        }
        try {
            await projectupdateUser (updatedUser)
            console.log(updatedUser);

        //let res = await projectupdateUser(updateUser)
        //props.changeCurrentUser(res)

        props.history.push(`/profile/${userId}`)
        } catch(e) {
            
            console.log(e);
        }
        //(`/profile/${(props.user))  (`/profile/"${userId}"`)
       
    }
    
    return (
        <div>
        <Container maxWidth="lg" className={classes.container}>
            <form className={classes.form} autoComplete="off" onSubmit={updateUser}>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={6} md={12} lg={6} className={classes.grid}>
                        <TextField id="username" label="USERNAME" value={username} onChange={updateUsername} />
                        <TextField id="standard-basic" label="Firstname" value={firstName} onChange={updatefirstName} />
                        <TextField id="standard-basic" label="Lastname" value={lastName} onChange={updatelastName} />
                        <TextField id="password" type='password' label="PASSWORD" value={password} onChange={updatePassword} /> 
                        <TextField id="password" type='email' label="email" value={email} onChange={updateEmail} />   
                        <Button className={classes.submit} type='submit' variant="contained" color="secondary">Save Changes</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    </div>
)
}