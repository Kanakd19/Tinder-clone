import express from "express";
import mongoose from "mongoose"
import cards from "./dbCards.js"
import cors from "cors";

// App config
const app= express();
const port= process.env.PORT || 8000
const connection_url= "mongodb+srv://kanakd19:r4XNPFJKT0NSP9i0@cluster0.oq1pk5h.mongodb.net/tinderDB?retryWrites=true&w=majority"

// Middlewares
app.use(express.json())
app.use(cors())

// DB config 
mongoose.connect(connection_url,{
    useNewUrlParser: true,
})

// API endpoints
app.get("/", (req,res)=> res.status(200).send("HELLO GUYS"));

app.post("/tinder/cards", (req,res)=>{
    const dbCard=req.body;

    cards.create(dbCard, (err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get("/tinder/cards", (req,res)=>{

    cards.find((err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

// Listener
app.listen(port, ()=> console.log(`listening to localhost : ${port}`))