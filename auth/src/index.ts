import app from './app';
import mongoose from 'mongoose';
import logMsg from './utils/logMsg';

(async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('Dammit! JWT_KEY must be defined.');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    logMsg('cyan', 'ok', 'Connected to db');
  } catch (e) {
    logMsg('redBright', 'error', 'Could not connect to db: ');
    console.error(e);
  }

  app.listen(4000, () =>
    logMsg('greenBright', 'ok', `Running on port 4000...`)
  );
})();