//entry point of application 
import express, { NextFunction, Request, Response } from 'express'
import { reimbursementRouter } from './routers/reimbursement-router'
import { loginMiddleware } from './middleware/login-middleware'
import { userRouter } from './routers/user-router'
import { sessionMiddleware } from './middleware/session-middleware'
import { BadCredentialsError } from './errors/BadCredentialsError'
import { getUserByUsernameAndPassword } from './daos/SQL/user-dao'
import { corsFilter } from './middleware/cors-filter'
import './messaging/index'
import { userTopic } from './messaging/index'
import './event-listeners/new-users'


console.log(userTopic)
//begins app
const app = express() 

//take request - becomes json object- look for next function (middleware)
app.use(express.json({limit:'50mb'}))


app.use(loginMiddleware) //custom MW to run on all req
app.use(corsFilter)
app.use(sessionMiddleware) //tracks connections
app.use('/reimbursements', reimbursementRouter)
app.use('/users', userRouter)// redirect all requests on /users to the router

app.get('/health', (req:Request, res:Response)=> {
    res.sendStatus(200)
})


//endpoint for credentials to recieve authentication always aysnc! awaiting value!
app.post('/login', async (req:any, res:any, next:NextFunction)=>
{
    let username = req.body.username
    let password = req.body.password
    if(!username || !password)
    {
        
        throw new BadCredentialsError()
    } 
    else
    {
        try
        {
            let user = await getUserByUsernameAndPassword(username, password) 
            req.session.user = user// adds user data to session for other/future reqs
            res.json(user)
        }
        catch(e)
        {
            next(e)
        }
    }
})

//Error handler that express redirects top level errors to
app.use((err:any, req:any, res:any, next:any) => {
    if (err.statusCode) {    
    } else {
        console.log(err)//log it out to debug
        res.status(500).send('Oops, Something went wrong')
    }
})

app.listen(2020, () => {
    console.log('Server has started');
})