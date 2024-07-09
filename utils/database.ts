import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('mongodb is already connected');
        return;
    }
    else
    {
        try {
            //console.log('mongodb uri is: ', process.env.MONGODB_URI);
            await mongoose.connect(process.env.MONGODB_URI || '', {
                dbName: "share_dweet"
            });
    
            isConnected = true;
            
            //console.log('mongodb is now connected');
        }
        catch (error){
            console.log(error);
        }
        
    }
}