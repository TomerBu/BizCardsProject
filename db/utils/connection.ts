import mongoose from "mongoose";

export const connect = async () => {
  const host = process.env.DATABASE_HOST;
  const port = process.env.DATABASE_PORT;
  const database = process.env.DATABASE_NAME;
  const user = process.env.DATABASE_USER;
  const pass = process.env.DATABASE_PASSWORD;

  const connectionString = `mongodb://${user}:${pass}@${host}:${port}/${database}`;

  console.log(connectionString);
  //const connectionString = `mongodb://user:password@host:port/database`;

  await mongoose.connect(connectionString);

  //TODO: await seed();

  console.log("Database Connected");
};
 