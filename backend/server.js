import express from "express";
import router from "./routes/routes.js";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
dotenv.config();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());
app.use("/api", router);

app.listen(4000, () => console.log("server started"));
