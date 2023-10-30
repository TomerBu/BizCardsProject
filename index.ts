import express from "express";
import { config } from "dotenv";
config(); //load all the values from .env
import filmsRouter from "./routes/films";

const app = express();

//add an express middleware that uses JSON.parse(body)
app.use(express.json());

app.use("/api/v1/movies", filmsRouter);

const PORT = process.env.EXPRESS_PORT;

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
