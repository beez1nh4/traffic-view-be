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
    db = mongoClient.db("traffic-view")
    } catch( err){
        console.log(err)
    }

app.post("/paths", async (req, res) =>{
    const info = req.body
    try {
    await db.collection("paths")
    .insert(
    info
    )
    res.status(201).send("Information sent")
    } catch (err){
        res.status(500).send(err);
    }
})

app.get("/paths", async (req, res) => {
    try{
    const paths = await db.collection("paths")
    .find()
    .toArray()
    
    res.send(paths);
    }
    catch(err) {
      res.status(500).send(err);
    } 

})

app.listen(5000, () => 
    console.log("Server running in port: 5000")
)