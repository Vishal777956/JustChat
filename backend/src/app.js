import express from "express";
import {createServer} from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";



const app = express();
const PORT = 3000;

const server = createServer(app);
const io = connectToSocket(server);

app.set("PORT",process.env.PORT || PORT );
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));

app.use("/api/v1/users", userRoutes);


const start = async () =>{

  const connectionDb = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MONGODB connected, DB host: ${connectionDb.connection.host}`);

server.listen(app.get("PORT"),()=>{
  console.log("app is listening on port:",PORT);
});

}


start();
