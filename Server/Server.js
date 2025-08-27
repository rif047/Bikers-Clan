require('dotenv').config();
require('./Config/Database');

const Cors = require('cors');
const Express = require('express');
const Morgan = require('morgan');
const Routes = require('./Routes');

const App = Express();
const PORT = process.env.PORT || 9000;

// Middleware setup
App.use(Cors());
App.use(Express.static('Assets'));
App.use(Express.json({ limit: '10mb' }));
App.use(Express.urlencoded({ extended: true, limit: '10mb' }));
App.use(Morgan('dev'));


App.get('/', (req, res) => res.send('Server Running Successfully...'));

App.use('/api', Routes);



App.use((err, req, res, next) => {
    console.error('Unhandled Error:', err.stack || err);
    res.status(500).json({ error: 'Internal Server Error' });
});


App.listen(PORT, () => {
    console.log(`Server is Running at http://localhost:${PORT}`);
});


process.on('SIGINT', () => {
    console.log('Server shutting down...');
    process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
});
