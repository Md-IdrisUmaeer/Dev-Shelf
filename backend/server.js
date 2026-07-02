const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const resourceRoutes = require('./routes/resourceRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    if (req.body && typeof req.body === 'object') {
        const sanitize = (obj) => {
            Object.keys(obj).forEach(key => {
                if (key.startsWith('$')) {
                    delete obj[key];
                } else if (obj[key] && typeof obj[key] === 'object') {
                    sanitize(obj[key]);
                }
            });
        };
        sanitize(req.body);
    }
    next();
});

app.use('/api/resources', resourceRoutes);
app.get('/', (req, res) => {
    res.send('API is running successfully...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});