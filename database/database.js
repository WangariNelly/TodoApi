const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose.set('strictQuery', false);

  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => {
      console.log(
        `MongoDB connected to HOST: ${connection['connection'].host}`,
      );
    })
    .catch((err) => {
      console.log(`MongoDB connection error: ${err.message}`);
    });
};

module.exports = connectDatabase;
