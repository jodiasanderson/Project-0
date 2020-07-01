import express, { Request, Response, NextFunction} from 'express'
import { ReimUserInputError } from '../errors/ReimUserInputError'
//import { ReimIdInputError } from '../errors/ReimIdInputError'
//import { ReimNotFoundError } from '../errors/ReimNotFoundError'
import { getAllReim, findbyStatus } from '../daos/reimbursement-dao'
import { ReimIdInputError } from '../errors/ReimIdInputError'
//import { Reimbursement } from 'src/models/Reimbursement'

//prints from DB
export let reimbursementRouter = express.Router()
reimbursementRouter.get('/', async(req:Request, res:Response,next: NextFunction)=> 
{ 
    let reimbursement = await getAllReim()
    res.json(reimbursement) 
})

//save rem
reimbursementRouter.post('/', (req:Request, res:Response)=>
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


reimbursementRouter.get('/:id',async (req:Request, res:Response,next:NextFunction )=> //destructuring
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
            let reimbursement = await findbyStatus(+id)
            res.json(reimbursement)
        } 
        catch(e)
        {
            next(e)
        }
    }
})
