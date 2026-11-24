import { application } from "express";
import connectDB from "./config/connection";

const PORT = process.env.PORT

async function startServer() {
  await connectDB();
  application.listen(PORT, () => {console.log(`🌍 Now listening on localhost:${PORT}`)})
};

startServer();