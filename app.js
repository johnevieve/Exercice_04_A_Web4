require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const helmet = require('helmet');
const apiRouter = require('./routes/api');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:8000'
}));

app.use(helmet({
    contentSecurityPolicy: false,
    referrerPolicy: { policy: 'no-referrer' }
}));

app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});