require ('dotenv').config()
const express=require("express")
const cors=require("cors")
const router=require("./Router/router")
require("./DB/connection")


const DealsDray=express()

DealsDray.use(cors())
DealsDray.use(express.json())
DealsDray.use(router)
DealsDray.use('/uploads',express.static('./uploads'))
const PORT=3000||process.env.PORT


DealsDray.listen(PORT,()=>{
    console.log(`Project Fair Server Started at ${PORT}`);
    console.log(`PORT:-  http://localhost:${PORT}/`)
})

DealsDray.get("/",(req,res)=>{
    res.status(200).send(`<h1>DealsDray Server Started</h1>`)
})

