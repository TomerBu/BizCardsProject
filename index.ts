import express from "express";
import booksRouter from "./routes/books";
import logger from "./middleware/logger";
import notFound from "./middleware/not-found";
import { config } from "dotenv";

config();

const app = express();

//const for the PORT number
const PORT = 8080;

app.use(logger);
app.use(booksRouter);
app.use(notFound);

// app listen on port, callback that runs when the app is running
app.listen(PORT, () => {
  //once the app is running, log the server url.
  console.log(`Server is running on: http://localhost:${PORT}`);
});
