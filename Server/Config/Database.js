const Mongoose = require('mongoose');

// Enable detailed logs for debugging during development
Mongoose.set('strictQuery', true);
Mongoose.set('debug', process.env.NODE_ENV !== 'production');

Mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000, // Wait 5 seconds for MongoDB to respond
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
})
    .then(() => console.log('Database Connected Successfully'))
    .catch((err) => {
        console.error('Database Connection Error:', err);
        process.exit(1); // Exit if the database fails to connect
    });

// Handle disconnections gracefully
Mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB connection lost. Attempting to reconnect...');
});

module.exports = Mongoose;
