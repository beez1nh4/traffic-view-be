import express from 'express'
import cors from 'cors'
import { MongoClient} from "mongodb";
import dotenv from 'dotenv'

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()


const mongoClient = new MongoClient(process.env.MONGO_URI);
let db

try{
    await mongoClient.connect();
    db = mongoClient.db("Cluster0")
    } catch( err){
        console.log(err)
    }


app.listen(5000, () => 
    console.log("Server running in port: 5000")
)