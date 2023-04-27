require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const helmet = require('helmet');
const apiRouter = require('./routes/api');
app.use(helmet());
app.use('/api', apiRouter);
app.listen(port, () => {
console.log(`Listening at http://localhost:${port}`);
});