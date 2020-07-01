import {PoolClient, QueryResult} from "pg"; 
import {connectionPool} from ".";
import { ReimbursementDTOConvertor } from "../utils/ReimbursementDTO-Rem-converter";
import { ReimNotFoundError } from "../errors/ReimNotFoundError";
import { Reimbursement } from "src/models/Reimbursement";
//import { Reimbursement } from "../models/Reimbursement";
//import { ReimbursementStatus } from "src/models/ReimbursementStatus";
//import { Reimbursement } from "src/models/Reimbursement";
//import { ReimbursementStatus } from "src/models/ReimbursementStatus";

//gets reimbursements from DB
export async function getAllReim()
{
    let client:PoolClient; 
    try
    {
        client = await connectionPool.connect()
        let results:QueryResult = await client.query(`select r.reimbursement_id, r.author , r.amount,
                                                    r."dateSubmitted" , r."dateResolved" , r.description, 
                                                    r.resolver, r.status, r."type" from project0.reimbursement r left join project0.reimbursementtype rs 
                                                    on r."type" = rs.type_id;`) 
        return results.rows.map(ReimbursementDTOConvertor) 
    }
    catch(e)
    {
        console.log(e)
        throw new Error ('un-implented error handling')
    }
    finally
    {
       client && client.release() 
    }
}


export async function findbyStatus(id: number):Promise<Reimbursement>
{
    let client: PoolClient
    try {
        //get a connection
        client = await connectionPool.connect()
        //send the query
        let results = await client.query
            ( `select r.reimbursement_id, r.author , r.amount,
            r."dateSubmitted" , r."dateResolved" , r.description, 
            r.resolver, r.status, r."type" from project0.reimbursement r left join project0.reimbursementtype rs 
            on r."type" where r.type_id = ${id}
            group by r.type_id;`)
            // $1 to specify a parameter to fill in a value using an array as second arg of query function
        if(results.rowCount === 0)
        {
            throw new Error('Reimbursement Not Found')
        }
        return ReimbursementDTOConvertor(results.rows[0])
    } 
    catch (e) 
    {
        if(e.message === 'Reimbursement Not Found')
        {
            throw new ReimNotFoundError()
        }
        console.log(e)
        throw new Error('Unhandled Error Occured')
    }
    finally 
    {
        client && client.release()
    }
}
