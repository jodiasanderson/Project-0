import { getAllUsers, getUserById, saveOneUser } from "../daos/SQL/user-dao";
import { User } from "../models/User";
import { bucketBaseUrl } from "../daos/Cloud-Storage";
import { saveProfilePicture } from "../daos/Cloud-Storage/user-images";
//import { expressEventEmitter, customExpressEvents } from "../event-listeners";


//the most basic service function you will see
//all it does is call the dao
// its easier to expand a function that already exists instead of inserting a new function in to the mix
export async function getAllUsersService(): Promise<User[]> {
    return await getAllUsers()
}


export async function getUserByIDService(id: number): Promise<User> {
    return await getUserById(id)
}

export async function saveOneUserService(newUser: User): Promise<User> {
    //two major process to manage in this function
    try {
        let base64Image = newUser.image
        let [dataType, imageBase64Data] = base64Image.split(';base64,')// gets us the two important parts of the base 64 string
        let contentType = dataType.split('/').pop()// split our string that looks like data:image/ext into ['data:image' , 'ext]
        
        if (newUser.image) {
            newUser.image = `${bucketBaseUrl}/users/${newUser.username}/profile.${contentType}`
        }
        //we need to save new user data to the sql database
        let savedUser = await saveOneUser(newUser)

        
        await saveProfilePicture(contentType, imageBase64Data, `users/${newUser.username}/profile.${contentType}`)
        
        //expressEventEmitter.emit(customExpressEvents.NEW_USER, newUser)
        return savedUser
    } catch (e) {
        console.log(e)
        throw e
    }
}