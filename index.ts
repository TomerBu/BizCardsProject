import express from "express";
import { config } from "dotenv";
import usersRouter from "./routes/users";
import { logger } from "./middleware/logger";
import { connect } from "./db/utils/connection";
import { initDatabase } from "./db/utils/init-database";
config(); //load all the values from .env
connect();

const demo = async () => {
  const saved = await initDatabase();
  console.log(saved)
};
demo();

const app = express();

//add an express middleware that uses JSON.parse(body)
app.use(express.json());
app.use(logger);

app.use("/api/v1/users", usersRouter);

const PORT = process.env.EXPRESS_PORT;

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
