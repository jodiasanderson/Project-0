import express, { Request, Response, NextFunction } from 'express'
import { authenticationMiddleware } from '../middleware/authentication-middleware'
import { getAllUsers, getUserById, saveOneUser } from '../daos/user-dao'
import { authorizationMiddleware } from '../middleware/authorization-middleware'
import { UserUserInputError } from '../errors/UserUserInputError'
import { User } from '../models/User'

//prints from DB
//base path is /users
export const userRouter = express.Router()

// this applies this middleware to the entire router beneath it
userRouter.use(authenticationMiddleware)


// Get all
userRouter.get('/', authorizationMiddleware(['finance manager']), async (req: Request, res: Response, next: NextFunction) => 
{
    try {
        let allUsers = await getAllUsers()//thinking in abstraction
        res.json(allUsers)
    } 
    catch (e) 
    {
        next(e)
    }
})


//Get by id
userRouter.get('/:id', authorizationMiddleware(['finance manager']), async (req: Request, res: Response, next: NextFunction) =>
{
    let { id } = req.params
    if (isNaN(+id)) 
    {
        
        res.status(400).send('Id must be a number')
    } 
    else 
    {
        try 
        {
            let user = await getUserById(+id)
            res.json(user)
        } 
        catch (e) 
        {
            next(e)
        }
    }
})

//Save new
userRouter.post('/', authorizationMiddleware(['finance manager']), async (req: Request, res: Response, next: NextFunction) => 
{
    //input from the user
    let { username, password, firstName, lastName, email, role } = req.body//destructuring
    //verify input
    if (!username || !password || !role) 
    {
        next(new UserUserInputError)
    } 
    else 
    {
        //call to the dao/DB layer to try and save user
        let newUser: User = 
        {
            username,
            password,
            firstName,
            lastName,
            role,
            userId: 0,
            email,
        }
        newUser.email = email || null
        try 
        {
            let savedUser = await saveOneUser(newUser)
            res.json(savedUser)// needs to have the updated userId
        } 
        catch (e) 
        {
            next(e)
        }
    }
})

//Patch user?

//Delete user?

