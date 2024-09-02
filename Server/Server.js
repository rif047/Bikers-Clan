const Express = require('express');
const CORS = require('cors');
const Routes = require('./Routes');

require('dotenv').config();
require('./Config/Database');

const App = Express()


App.use(Express.json());
App.use(Express.urlencoded({ extended: true }));
App.use(Express.static('Assets'));
App.use(CORS());


App.get('/', (req, res) => {
    res.send('Server Running Successfully.')
})

App.use('/api/', Routes);


App.listen(9000, () => {
    console.log('Server Running at http://localhost:9000');
})