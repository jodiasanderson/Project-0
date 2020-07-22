import { projectClient } from "."

export const projectGetUserById = async (userId:number) =>{

    try{
        let response = await projectClient.get(`/users/${userId}`)
        return response.data
    } catch(e){
        console.log(e);
        console.log('we should probably handle this');   
    }
}