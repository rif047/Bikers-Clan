const Mongoose = require('mongoose');

Mongoose.set('strictQuery', true);

const url = process.env.DB_URL;

Mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Database Connected Successfully')).catch(err => console.error(err));
