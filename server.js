const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        password: '',
        database: 'smart-brain'
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.post("/signin", signin.handleSignin(db, bcrypt));

app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get("/profile/:id", profile.handleProfile(db));

app.put("/image", image.handleImage(db));
app.post("/imageurl", image.handleApiCall);

app.listen(3000, () => {
    console.log("app is running on port 3000");
});