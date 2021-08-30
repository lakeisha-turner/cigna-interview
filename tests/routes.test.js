import "babel-polyfill";
import express from 'express';
import path from 'path';
import doctorsRouter from '../routes/doctors.js';
import request from 'supertest';
import data from '../data.json';
import { it } from '@jest/globals';

const app = express();
app.set('views', path.join(__dirname.replace('/tests',''), 'views'));
app.set('view engine', 'jade');

app.use("/doctors", doctorsRouter); //routes

describe("Testing Server Routes", () => {
    it("GET /doctors - success", async () => {
        const { body }  = await request(app).get("/doctors");
        expect(body).toEqual(data.results);
    });

    it("GET /doctors/:search - success", async () => {
        const { body }  = await request(app).get("/doctors/pathology");
        expect(body[0]).toEqual(data.results[1]);
    });

});