import mongoose from 'mongoose'

type connectionObject = {
    isConnected?: number
}

const connection: connectionObject = {}

export async function dbconnect(): Promise<void> {
    //this if refers when the mongodb is already connected 
    if(connection.isConnected) {
        console.log("Connection already exist");
        return
    }
    //This else refers when the mongodb is not connected and have to connect
    else {
        try {
            const db = await mongoose.connect(process.env.MONGODB_URI || '', {})//{} this is for option for mongodb connection. This option will provide security like secureURL and httponly, etc.

            connection.isConnected = db.connection.readyState
            console.log("MongoDB readyState: ", db.connection.readyState)
        }
        catch(err) {
            console.log("Connection error occured: ", err)
            process.exit(1)
        }
    }
}
