require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app=express();

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("connected"));

app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/users',usersRouter);
app.listen(3000,()=>{
    console.log("server started");
});