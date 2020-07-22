  
//pubsub topics
import { PubSub } from '@google-cloud/pubsub'

const pubSubClient = new PubSub()

export const userTopic = pubSubClient.topic('projects/my-project-0-281703/topics/user-service')

