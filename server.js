require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const swaggerjsdoc=require('swagger-jsdoc');
const swaggerui=require('swagger-ui-express');

const app=express();

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("connected"));

const options = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: "The User API Documentation",
            version: "0.1.0",
            description: "This documentation provides you the path to use the user-api which allows to perform CRUD operations on user.",
            contact: {
                name: "Lalit Dungriyal",
                url: "https://user-api-l7au.onrender.com",
            }
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ['./routes/*.js'],
};


const spacs=swaggerjsdoc(options);
app.use(
    "/api-docs",
    swaggerui.serve,
    swaggerui.setup(spacs)
)

app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/users',usersRouter);
app.listen(3000,()=>{
    console.log("server started");
});