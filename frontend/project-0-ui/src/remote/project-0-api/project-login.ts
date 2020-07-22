import { projectClient } from "."
//import { User } from "../../models/User";


export const projectLogin = async (username:string, password:string) => {
    let credentials = {
        username,
        password
    }
    try{
        let response = await projectClient.post('/login', credentials)
        console.log(response);
        return response.data
    } catch(e){
        console.log(e);
        
    }
}