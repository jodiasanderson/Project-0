import { projectClient } from "."


export const projectGetAllUsers = async () =>{
    try{
        let response = await projectClient.get('/users')
        return response.data
    }catch(e){
        console.log(e);
        console.log('We should probably handle this');
        
        
    }
}