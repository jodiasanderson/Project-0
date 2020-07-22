//this index is going to be for setting up the base axios client
import axios from 'axios'
//import { lbBaseUrl } from '../../environment'


// we will use this object to send off all of the other request we make to api
export const projectClient = axios.create({
    baseURL:'http://localhost:2020',
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials:true
})