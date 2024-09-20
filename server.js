const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const countFilePath = path.join(__dirname, 'count.json');
const registrationFilePath = path.join(__dirname, 'registrations.json');

app.use(express.json()); // To parse JSON bodies
app.use(express.static('public'));

// Initialize count and registrations if files don't exist
if (!fs.existsSync(countFilePath)) {
    fs.writeFileSync(countFilePath, JSON.stringify({ count: 0 }));
}

if (!fs.existsSync(registrationFilePath)) {
    fs.writeFileSync(registrationFilePath, JSON.stringify({ registrations: [] }));
}

// Visitor count endpoint
app.get('/visitor-count', (req, res) => {
    const data = JSON.parse(fs.readFileSync(countFilePath));
    data.count += 1;
    fs.writeFileSync(countFilePath, JSON.stringify(data));
    res.json({ count: data.count });
});

// Registration endpoint
app.post('/register', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }

    const registrationData = JSON.parse(fs.readFileSync(registrationFilePath));
    registrationData.registrations.push({ name, email });
    fs.writeFileSync(registrationFilePath, JSON.stringify(registrationData));

    const count = registrationData.registrations.length;
    res.json({ message: 'Registration successful', count });
});

// Endpoint to get the registration count
app.get('/registration-count', (req, res) => {
    const registrationData = JSON.parse(fs.readFileSync(registrationFilePath));
    const count = registrationData.registrations.length;
    res.json({ registrationCount: count });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});