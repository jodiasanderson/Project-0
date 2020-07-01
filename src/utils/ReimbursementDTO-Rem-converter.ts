import { ReimbursementDTO } from "../dtos/reimbursement-dto";
import { Reimbursement } from "../models/Reimbursement";

export function ReimbursementDTOConvertor( rdto:ReimbursementDTO):Reimbursement
{
    return {
        reimbursementId: rdto.reimbursement_id,
        author : rdto.author,
        amount: rdto.amount,  
        dateSubmitted : rdto.dateSubmitted.getFullYear(),
        dateResolved: rdto.dateResolved.getFullYear(),
        description: rdto.description,
        resolver: rdto.resolver,
        statusId: rdto.status,
        typeId: rdto.type
    
    }
} 

