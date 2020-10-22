import { connect, connection } from 'mongoose'
import { MONGODB_URI as _MONGODB_URI } from './utils/config'
import logger from './utils/logger'
const MONGODB_URI = _MONGODB_URI

const options = {useNewUrlParser:true,useUnifiedTopology:true}

connect(MONGODB_URI,options)

const db = connection;
db.on("error", err => {
  logger.error("There was a problem connecting to mongo: ", err);
  logger.info("Trying again");
  setTimeout(() => conn(), 5000);
});
db.once("open", () => logger.info("Successfully connected to mongo"));