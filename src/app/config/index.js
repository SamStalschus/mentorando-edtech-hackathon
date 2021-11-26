import * as dotenv from "dotenv";

dotenv.config()

export default {
  database: {
    URL: process.env.ATLAS_URI
  },
  googleAPI: {
    ACCESS_ID: process.env.GOOGLE_API_ACCESS_ID,
    SECRET_KEY: process.env.GOOGLE_API_SECRET_KEY,
    REFRESH_TOKEN: process.env.GOOGLE_API_REFRESH_TOKEN
  }
}