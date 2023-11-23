// the config function from the dotenv module:
import { config } from "dotenv";

// our function:
export const configEnv = () => {
  //NODE_ENV אפשר להגדיר משתנה בשם
  //"dev" משתנה עם ברירת מחדל של
  const env = process.env.NODE_ENV || "dev";

  config({
    path: `environments/.${env}.env`,
  });
};

//config() -> config({path: ".env"})
