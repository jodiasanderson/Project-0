import { projectClient } from ".";
import { User } from "../../models/User";


export const projectupdateUser = async (updatedUser:User) => {

    try{
        let response = await projectClient.patch(`/users`, updatedUser)
        console.log(response);
        return response.data
    } catch(e){
        console.log(e);
        throw e
    }
}