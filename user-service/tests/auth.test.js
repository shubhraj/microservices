const request = require('supertest');
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('../routes/auth.routes');

// Load env vars for testing
dotenv.config();

// Set up a minimal test app
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('Auth API', () => {
    it('should return 400 if no data is provided on register', async () => {
        const res = await request(app).post('/api/auth/register').send({});
        expect(res.statusCode).toBe(400);
    });
});
