import React, { FunctionComponent, useState } from 'react'
import { User } from '../../models/User'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { TitleComponent } from '../TitleComponent/TitleComponent';
//Display User Info here 

interface IUserDisplayProps{
    user:User
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: "auto",
        marginTop: theme.spacing(5),
        width: theme.spacing(74),
        height: theme.spacing(40),
      },
    },
    paper: {
      backgroundColor: 'black',
      padding: theme.spacing(1)
    },
    typography: {
      color: 'white',
      padding: theme.spacing(1),
      fontSize: 15
    }
  }),
);

export const UserDisplayComponent: FunctionComponent<IUserDisplayProps> = (props) => {
  let classes = useStyles()

  const [image, changeImage] = useState<any>(undefined)
  const updateImage = (e:any) => {
    let file = e.currentTarget.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
    //reader.result
        console.log(reader.result)
        //changeImage(s)
        changeImage(reader.result)
    }
}

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
      
      <TitleComponent size='p' title={`Welcome, ${props.user.username}`} />

      <Typography className={classes.typography} variant='h6'>
            USERID : {props.user.userId}
          </Typography>

          <Typography className={classes.typography} variant='h4'>
            USERNAME : {props.user.username}
          </Typography>
          <Typography className={classes.typography} variant='h4'>
           EMAIL : {props.user.email}
          </Typography>
          <label htmlFor='file'>Profile Picture: </label>
                    <input type='file' name='file' accept='image/*' onChange={updateImage}/>
                    <img src={image}/>
      
        </Paper>
    </div >
  )
}