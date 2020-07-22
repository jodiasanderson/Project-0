import { imageBucket } from ".";

export async function saveProfilePicture(contentType:string, imageBase64Data:string, fileName:string){
    try{

        let newImage = imageBucket.file(fileName)

      //  console.log(newImage);

      console.table(imageBase64Data);
        
        await newImage.save(Buffer.from(imageBase64Data, 'base64'), {
            metadata:{
                contentType
            }
        })
        console.log('post file save')

    } catch(e){
       // console.log(e);
        throw e  
    }
}
