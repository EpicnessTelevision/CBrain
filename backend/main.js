/**
 * C++ and C# Text Editor and Compiler App
 *
 * This application is a text editor and compiler for C++ and C# programming languages.
 * It is built using Vue.js for the frontend and Node.js for the backend.
 */

// Import required modules
const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');

// Create an instance of Express.js
const app = express();

// Set up the middleware to parse JSON requests
app.use(express.json());

// Define the route for saving the code file
app.post('/save', (req, res) => {
    const { language, code } = req.body;

    // Validate the language
    if (language !== 'cpp' && language !== 'csharp') {
        return res.status(400).json({ error: 'Invalid language' });
    }

    // Save the code to a file
    fs.writeFile('code.' + language, code, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to save code file' });
        }

        res.json({ message: 'Code file saved successfully' });
    });
});

// Define the route for compiling the code
app.post('/compile', (req, res) => {
    const { language } = req.body;

    // Validate the language
    if (language !== 'cpp' && language !== 'csharp') {
        return res.status(400).json({ error: 'Invalid language' });
    }

    // Compile the code using the appropriate compiler
    const compiler = language === 'cpp' ? 'g++' : 'csc';
    const command = `${compiler} code.${language}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to compile code' });
        }

        res.json({ message: 'Code compiled successfully', output: stdout });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

/**
 * Unit Tests
 */

// Import required modules for testing
const assert = require('assert');
const request = require('supertest');

// Test saving code file
describe('POST /save', () => {
    it('should save the code file', (done) => {
        const code = 'console.log("Hello, World!");';

        request(app)
            .post('/save')
            .send({ language: 'cpp', code })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                assert.strictEqual(res.body.message, 'Code file saved successfully');
                done();
            });
    });

    it('should return an error for invalid language', (done) => {
        const code = 'console.log("Hello, World!");';

        request(app)
            .post('/save')
            .send({ language: 'python', code })
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);

                assert.strictEqual(res.body.error, 'Invalid language');
                done();
            });
    });
});

// Test compiling code
describe('POST /compile', () => {
    it('should compile the code', (done) => {
        request(app)
            .post('/compile')
            .send({ language: 'cpp' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                assert.strictEqual(res.body.message, 'Code compiled successfully');
                done();
            });
    });

    it('should return an error for invalid language', (done) => {
        request(app)
            .post('/compile')
            .send({ language: 'python' })
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);

                assert.strictEqual(res.body.error, 'Invalid language');
                done();
            });
    });
});