const MySQL = require('./packages/library/mysql');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

//Purely intelligence starts here ^^
const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('views'));
app.use(cors());

app.listen(port, () => {
    console.log(`[@velane] ${process.env.APP_NAME} is my name ^^\n[@velane] My version is ${process.env.APP_VERSION}.\n\n`);

    MySQL.setupDatabaseConnection();

    let i = 0;
    setInterval(async function() {
        i += 15;
        let users_count = await MySQL.Query(`SELECT COUNT(*) FROM users`);
        
        console.log(`[@velane] Hello, I'm still up for ${Math.floor(i/60)} minutes!\n[@velane] There are ${users_count[0]["COUNT(*)"]} registered!`);
    },15000);
});

app.use('/api/', require('./packages/apis/index'));