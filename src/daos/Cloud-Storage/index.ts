//bucket stuff here 
import {Storage} from '@google-cloud/storage'

export const bucketName = 'jodi-bucket'

export const bucketBaseUrl = `https://storage.googleapis.com/${bucketName}`

export const imageBucket = new Storage().bucket(bucketName)