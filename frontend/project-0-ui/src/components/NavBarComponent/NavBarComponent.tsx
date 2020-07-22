import React, { FunctionComponent } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {Link} from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';
 //menu selection, title and links here 
 //three ways to move reirect, link, route history push 1:49 in video 
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(20),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export const NavBarComponent: FunctionComponent<any> = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    //FIX HERE FOR MENU BEFORE LOGINS we can programmatically build the menu items
    let menuItems = []
    //always have the login item
    menuItems.push(<MenuItem onClick={handleClose}><Link to='/login'>Main Menu</Link></MenuItem>) //change here 
    if(props.user){
        //if they are logged in, add the other items
        menuItems.push(<MenuItem onClick={handleClose}><Link to='/clicker'>Home</Link></MenuItem>,
        <MenuItem onClick={handleClose}><Link to={`/profile/${(props.user)?props.user.userId : '0' }`}>My Profile</Link></MenuItem>,
        <MenuItem onClick={handleClose}><Link to={`/edit/${(props.user)?props.user.userId : '0' }`} >Edit My Profile</Link></MenuItem>,
        <MenuItem onClick={handleClose}><Link to={`/logout`} >Logout</Link></MenuItem>,
        /*MenuItem onClick={handleClose}><Link to='/first'>First</Link></MenuItem>*/
        /*MenuItem onClick={handleClose}><Link to='/title'>Title</Link></MenuItem>*/
        )    
    }
    if(props.user && props.user.role === 'Admin'){
        menuItems.push(<MenuItem onClick={handleClose}><Link to='/users'>All Users</Link></MenuItem>,)
    }


    return (
        <nav>
            <AppBar position="sticky" style={{backgroundColor: "black", color: "white"}}>
                <Toolbar>
                    <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Menu id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        {menuItems}
                    </Menu>
                    <Typography variant="h3" className={classes.title}>
                        XOXO 
                </Typography>
                <SearchIcon/>
                    <Button onClick={handleClose}><Link to='/login'>Sign in</Link></Button>
                    / <Button onClick={handleClose}><Link to='/registration'>Register</Link></Button>  
                    <IconButton color ="inherit" aria-label ='account'>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </nav>
    )
}