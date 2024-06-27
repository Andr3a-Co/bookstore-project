import express from "express";
import { PORT, dbURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//Parsing request body
app.use(express.json());

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'], 
    })
);
//Books routes
app.use('/books', booksRoute);

mongoose
    .connect(dbURL)
    .then( () => {
        console.log('App connected to database');
        app.listen(PORT, ()=> {
            console.log(`App listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });