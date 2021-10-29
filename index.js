const express = require("express");
const cors = require("cors");
const { MongoClient } = require('mongodb');
const ObjectId = require("mongodb").ObjectId;


require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3l260.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
        const database = client.db('tourism_web');
        const tourOffers = database.collection('tourOffers');

         const databaseTwo = client.db('tourSingleItem');
         const singleItemData= databaseTwo.collection('singleItemData');
        
        // get method ----------------------------- 
        app.get("/tourOffers", async(req, res)=>{
            const cursor = tourOffers.find({});
            const allOffers = await cursor.toArray();
            res.send(allOffers);
            console.log(allOffers)
        })

        //Post method -----------------------------
        app.post("/addUser", async(req, res) => {
           const result = await singleItemData.insertOne(req.body);
           res.json(result)
        })


    
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get("/", (req, res) =>{
    res.send("this is my nodejs")
});

app.listen(port, ()=>{
    console.log("the port is hitting", port)
});