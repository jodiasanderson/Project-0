

import { expressEventEmitter, customExpressEvents } from ".";
import { User } from "../models/User";
import { userTopic } from "../messaging";


expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser:User)=>{

    setImmediate(async ()=>{
        try{
            let res = await userTopic.publishJSON(newUser)
            console.log(res);//returns message id
        }catch(e){
            console.log(e)
        }
    })
})


expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser:User)=>{
    
})


expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser:User)=>{
    //sends an email with their password reset link
})

expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser:User)=>{
    
})