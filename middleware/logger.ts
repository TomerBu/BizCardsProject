import morgan from "morgan";

const format = process.env.NODE_ENV == "prod" ? "tiny" : "dev";

export const logger = morgan(format);
