const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log('Database Connected with HOST: ' + process.env.DB_LOCAL_URI);
    });
};

module.exports = connectDatabase;
