import mongoose from 'mongoose';
import { ConnectOptions } from 'mongoose';
let isConnected = false; //track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('MongoDB is already connected');
        return
    }

    try {

        const mongoDBURL = process.env.MONGODB_URL;

        if (!mongoDBURL) {
            throw new Error('MONGODB_URL environment variable is not defined');
        }


        await mongoose.connect(mongoDBURL, {
            dbName: 'FrontendUpToDate',  useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions )

        isConnected = true;
        console.log('MongoDB connected')


    } catch (error) {
        console.log(error)
    }

}