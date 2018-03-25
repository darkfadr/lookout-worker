import mongoose from 'mongoose';
import semver from 'semver';

const { MONGO_URI='mongodb://', APP_NAME} = process.env;
mongoose.Promise = global.Promise;

// configure mongodb
mongoose.connect(MONGO_URI, {useMongoClient: true});

mongoose.connection.on('open', err =>
  console.log(`${APP_NAME} is now connected to the Mongo Database`));

mongoose.connection.on('error', err => {
  console.error(`MongoDB error: ${err.message}`);
  console.error('Make sure a mongoDB server is running and accessible by this application');
  process.exit(1);
});


export default mongoose;
