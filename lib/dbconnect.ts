import mongoose from 'mongoose'

type connectionObject = {
    isConnected?: number
}

const connection: connectionObject = {}

export async function dbconnect(): Promise<void> {
    // Check if already connected (readyState 1 means connected)
    if (connection.isConnected === 1) {
        console.log("Connection already exists");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {
            // Add connection options for better reliability
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
            bufferCommands: false, // Disable mongoose buffering
        })

        connection.isConnected = db.connection.readyState
        console.log("MongoDB readyState: ", db.connection.readyState)

        // Wait for connection to be fully established
        if (db.connection.readyState !== 1) {
            await new Promise((resolve, reject) => {
                db.connection.on('connected', resolve)
                db.connection.on('error', reject)
                setTimeout(() => reject(new Error('Connection timeout')), 10000)
            })
        }
    } catch (err) {
        console.log("Connection error occurred: ", err)
        process.exit(1)
    }
}
