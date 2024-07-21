const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/api/questions', (req, res) => {
    // Handle incoming POST requests here
    const questionData = req.body;
    // Process the data as needed
    console.log('Received question:', questionData);
    res.status(200).json({ message: 'Question received!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
