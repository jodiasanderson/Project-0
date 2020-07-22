import express, { Request, Response, NextFunction } from 'express'
//import { authenticationMiddleware } from '../middleware/authentication-middleware'
import {patchUser, deleteUser, saveOneUser } from '../daos/SQL/user-dao'
//import { authorizationMiddleware } from '../middleware/authorization-middleware'
//import { UserUserInputError } from '../errors/UserUserInputError'
import { User } from '../models/User'
//import { BadCredentialsError } from '../errors/BadCredentialsError'
//import {AuthFailureError} from '../errors/AuthFailureError'
import { getAllUsersService, getUserByIDService } from '../services/user-service'
//saveOneUserService 

//prints from DB
//base path is /users
export const userRouter = express.Router()

// this applies this middleware to the entire router beneath it
//userRouter.use(authenticationMiddleware)


// Get all
userRouter.get('/logout', function(req:any, res:any){
    //req.logout();
    delete req.user

    res.redirect('Log out sucessful');
  });

userRouter.get('/logout2',(req,res) => {
    
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });

});
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => 
{
    try {
        let allUsers = await getAllUsersService()//thinking in abstraction
        res.json(allUsers)
    } 
    catch (e) 
    {
        next(e)
    }
})


//Get by id
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) =>
{
    let { id } = req.params
    if (isNaN(+id)) 
    {
        
        res.status(400).send('Id must be a number')
    } 
    //else if(req.session.user.role === "user" && req.session.user.userId !== +id){
        //next(new AuthFailureError);
    
    else{
        try 
        {
            let user = await getUserByIDService(+id)
            res.json(user)
        } 
        catch (e) 
        {
            next(e)
        }
    }
})
//update user had admin can see and update user change to user can see and update info 
//users
userRouter.patch('/', async (req:Request, res:Response, next:NextFunction) =>
{
     //let { id } = req.params
    let { userId,
        username,
        password,
        firstName,
        lastName,
        email,
        role } = req.body
        if(!userId) 
        { 
            res.status(400).send('Please enter userId and update a field')
        }
        else if(isNaN(+userId)) { 
            res.status(400).send('Id needs to be a number')
        }
        //else if(req.session.user.role === "user" && req.session.user.userId !== +id){
            //next(new AuthFailureError);
        //}
        else {
            let updatedUser:User = {
                userId,
                username,
                password,
                firstName,
                lastName,
                email,
                role
            }
            updatedUser.username = username || undefined
            updatedUser.password = password || undefined
            updatedUser.firstName = firstName || undefined
            updatedUser.lastName = lastName || undefined
            updatedUser.email = email || undefined
            updatedUser.role = role || undefined
            try {
                let result = await patchUser(updatedUser)
                res.json(result)
                
            } catch (e) {
                next(e)
            }
        }
    }) 


//Save new
userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => 
{
   let { username, password, firstName, lastName, email, image} = req.body//destructuring
   //console.log(req.body)
   //verify input
   
    if (username!=undefined && password!=undefined  || lastName!=undefined  || firstName!=undefined  || email!=undefined  || image!=undefined  ) {
     //call to the dao/DB layer to try and save user
       let newUser: User = 
       {
           username,
           password,
           firstName,
           lastName,
           role : '27',
           userId: 0,
           email,
           image
       }
     
       newUser.email = email || null
       try 
       {
          //console.log(req.body)
           let savedUser = await saveOneUser(newUser)
           res.json(savedUser)
           //console.log(savedUser)
           // needs to have the updated userId
       } 
       catch (e) 
       {
           next(e)
       }
    }
    
})

userRouter.delete('/', async (req: Request, res: Response, next: NextFunction) => {
    let { userId } = req.body

    if((userId = Number && userId))  {  
    let deletedUser: User = {
        
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        role : 'User',
        userId:0,
        email: '',
        
    }
    
    try {
        await deleteUser(deletedUser)
        res.send('Sad to see you go :(. Account sucessfully deleted')

    } catch (e) {
        next(e)
    }
}else if ((!userId)) {
    res.status(400).send('Please include id to delete account')
}
})