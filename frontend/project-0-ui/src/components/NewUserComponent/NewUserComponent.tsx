import React, { FunctionComponent, SyntheticEvent, useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { User } from '../../models/User'
import {toast} from 'react-toastify'
import { projectSaveUser} from '../../remote/project-0-api/project-save-user'
import { Grid, makeStyles, Container } from '@material-ui/core'
//import { Redirect } from 'react-router'


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

export const NewUserComponent: FunctionComponent<any> = (props) => {

    const classes = useStyles();
    

    let [username, changeUsername] = useState('')
    let [lastName, changeLastName] = useState('')
    let [firstName, changeFirstName] = useState('')
    let [password, changePassword] = useState('')
    let [confirmPassword, changeConfirmPassword] = useState('')
    let [email, changeEmail] = useState('')
    const [image, changeImage] = useState<any>(undefined) //''||  null || undefined
 

    const updateUsername = (e:any) => {
        e.preventDefault()
        changeUsername(e.currentTarget.value)
    }
    const updatePassword = (e:any) => {
        e.preventDefault()
        changePassword(e.currentTarget.value)
    }
    const updateConfirmPassword = (e:any) => {
        e.preventDefault()
        changeConfirmPassword(e.currentTarget.value)
    }
    const updatefirstName = (e:any) => {
        e.preventDefault()
        changeFirstName(e.currentTarget.value)
    }
   
    const updatelastName = (e:any) => {
        e.preventDefault()
        changeLastName(e.currentTarget.value)
    }
    const updateEmail = (e:any) => {
        e.preventDefault()
        changeEmail(e.currentTarget.value)
    }
    
    const updateImage = (e:any) => {
        let file = e.currentTarget.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
        //reader.result
           // console.log(reader.result)
            //changeImage(s)
            changeImage(reader.result)
        }
    }
    


    const submitUser = async (e: SyntheticEvent) => {
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error('Password Do Not Match')
        }else {
            let newUser:User = {
                
                userId:0,
                username,
                firstName, 
                lastName, 
                password,
                email,
                role:'user',
                image
            }
    
             await projectSaveUser(newUser)
            console.log(newUser) //to see errors
             props.history.push(`/login`)
        
        }   
        
    }

    //const classes = useStyles();

    return (
        <div>
        <Container maxWidth="lg" className={classes.container}>
            <form className={classes.form} autoComplete="off" onSubmit={submitUser}>
                <Grid container spacing={10}>
                    <Grid item xs={2} sm={6} md={12} lg={4} className={classes.grid}>
                    <TextField id="standard-basic" label="Username" value={username} onChange={updateUsername} />
                    <TextField id="standard-basic" type='password' label="password" value={password} onChange={updatePassword}/>
                    <TextField id="standard-basic" type='password' label="confirm password" value={confirmPassword} onChange={updateConfirmPassword}/>
                    <TextField id="standard-basic" label="Firstname" value={firstName} onChange={updatefirstName} />
                    <TextField id="standard-basic" label="Lastname" value={lastName} onChange={updatelastName} />
                    <TextField id="standard-basic" type='email' label="email" value={email} onChange={updateEmail}/> 
                    <input type='file' name='file' accept='image/*' onChange={updateImage}/>
                    <img src={image}/>
                    <Button className={classes.submit} type='submit' variant="contained" color="secondary">REGISTER</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    </div>
)
}