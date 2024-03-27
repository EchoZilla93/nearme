import * as mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL || '', {
        // @ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log("Database connected 👨‍💻");
    } catch (error) {
        console.log("Error connecting to database 🚨", error);
    }
};

export  default connect;
