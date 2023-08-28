const express = require('express');
const app = express();

const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })

const connectDatabase = require('./config/database')
connectDatabase();

const jobs = require('./routes/jobs')

app.use(express.json())

const PORT = process.env.PORT;
app.use('/api/v1', jobs);
app.listen(PORT, () => {
    console.log(`serer started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})