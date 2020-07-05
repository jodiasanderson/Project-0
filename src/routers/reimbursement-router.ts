import express, { Request, Response, NextFunction} from 'express'
//import { ReimUserInputError } from '../errors/ReimUserInputError'
//import { ReimIdInputError } from '../errors/ReimIdInputError'
//import { ReimNotFoundError } from '../errors/ReimNotFoundError'
import { getAllReim, findbyStatus,updateReimbursementInfo, findbyUser, submitReimbursement } from '../daos/reimbursement-dao'
import { ReimIdInputError } from '../errors/ReimIdInputError'
//import { Reimbursement } from 'src/models/Reimbursement'
//import {authorizationMiddleware} from '../middleware/authorization-middleware'
import { Reimbursement } from '../models/Reimbursement'
import { ReimUserInputError } from '../errors/ReimUserInputError'


//prints from DB
export let reimbursementRouter = express.Router()

//Get all rem
reimbursementRouter.get('/', async(req:Request, res:Response,next: NextFunction)=> 
{
    try
{ 
    let allReimbursement = await getAllReim()
    res.json(allReimbursement) 
} 
catch (e) 
{
    next(e)
}
})


//save rem
reimbursementRouter.post('/s', (req:Request, res:Response, next: NextFunction)=>
{   
    console.log(req.body);
    let {reimbursementId, 
        author,
        amount,  
        dateSubmitted, 
        dateResolved, 
        description, 
        resolver,
        status } = req.body
        if(reimbursementId && author && amount && dateSubmitted &&
            dateResolved &&description && resolver && status)
        {
            res.sendStatus(201)  //created
        }
        else
        {
           throw new  ReimUserInputError()
        }
})


reimbursementRouter.get('/status/:id',async (req:Request, res:Response,next:NextFunction )=> //destructuring
{
    let{id} = req.params
    if(isNaN(+id))
    {
        throw new ReimIdInputError()
    } 
    else 
    {
        try 
        {
            let reimbByStatusId = await findbyStatus(+id)
            res.json(reimbByStatusId)
        } 
        catch(e)
        {
            next(e)
        }
    }
})

reimbursementRouter.get('/author/userId/:userId',async (req:Request, res:Response,next:NextFunction )=> //destructuring
{
    let{userId} = req.params
    if(isNaN(+userId))
    {
        throw new ReimIdInputError()
    } 
    else 
    {
        try 
        {
            let reimbByUserId = await findbyUser(+userId)
            res.json(reimbByUserId)
        } 
        catch(e)
        {
            next(e)
        }
    }
})

//Update Reim
reimbursementRouter.patch('/',  async (req:Request, res:Response, next:NextFunction) => {
    let { reimbursementId,
        author,
        amount,
        dateSubmitted,
        dateResolved,
        description,
        resolver,
        status,
        type} = req.body
    if(!reimbursementId) { //update request must contain a reimbursementId
        res.status(400).send('Reimbursement Updates Require ReimbursementId and at Least One Other Field')
    }
    if(isNaN(+reimbursementId)) { //check if reimbursementId is valid
        res.status(400).send('Id Needs to be a Number')
    }
    if  (status === "Approved" || status === "Denied")
    {

        let updatedReimInfo:Reimbursement = { 
            reimbursementId, 
            author,
            amount,
            dateSubmitted,
            dateResolved,
            description,
            resolver,
            status,
            type
        }
        updatedReimInfo.author = author || undefined
        updatedReimInfo.amount = amount || undefined
        updatedReimInfo.dateSubmitted = dateSubmitted || undefined
        updatedReimInfo.dateResolved = dateResolved || undefined
        updatedReimInfo.description = description || undefined
        updatedReimInfo.resolver = resolver || undefined
        updatedReimInfo.status = status || undefined
        updatedReimInfo.type = type || undefined
        try {
            let results = await updateReimbursementInfo(updatedReimInfo)
            res.json(results)
        } catch (e) {
            next(e)
        }
    } else {
        let updatedReimInfo: Reimbursement =
        {

        reimbursementId,
            author,
            amount,
            dateSubmitted: undefined,
            dateResolved: null,
            description,
            resolver: null,
            status:3,
            type
        }
        updatedReimInfo.author = author || undefined
        updatedReimInfo.amount = amount || undefined
        updatedReimInfo.description = description || undefined      
        updatedReimInfo.status = status || undefined
        updatedReimInfo.type = type || undefined

        try {
            let updatedReimbursementResults = await updateReimbursementInfo(updatedReimInfo)
            res.json(updatedReimbursementResults)
        } catch (e) {
            next(e)
        }
    }
})

//Submit/Save new
reimbursementRouter.post('/',async (req:Request, res:Response, next:NextFunction) => {
    console.log(req.body);
    let { amount, description, type, author } = req.body
        //let author =req.session.userId
        //console.log(amount)
        //console.log(author)
    if(author!=undefined || amount!= undefined || description!= undefined||type!=undefined) 
    {
        let newReim: Reimbursement = {
            reimbursementId: 0,
            author,
            amount,
            dateSubmitted: new Date(),
            dateResolved: new Date(),
            description,
            resolver: author,
            status:1,    
            type
        }
        newReim.type || null
        try {
            //console.log('hi')
                let savedReim = await submitReimbursement(newReim)
            res.json(savedReim)
        } catch (e) {
            next(e)
        }
    }
    else {
        throw new ReimUserInputError()
    }

})
