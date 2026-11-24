import 'dotenv/config'
import e from "express";
import connectDB from "./config/connection.js";
import router from './routes/index.js';

const app = e();
const PORT = process.env.PORT

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {console.log(`🌍 Now listening on localhost:${PORT}`)})
};

app.use(e.urlencoded({ extended: true }));
app.use(e.json());

app.use(router)

startServer();

