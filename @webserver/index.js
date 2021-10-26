const MySQL = require('./packages/library/mysql');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('views'));
app.use(cors());

app.listen(port, () => {
    console.log(`Platforma de examinare Online\n\n`);

    MySQL.setupDatabaseConnection();
});

app.use('/api/', require('./packages/apis/index'));