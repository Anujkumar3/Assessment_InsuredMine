const express = require('express');
const connectDB = require('./db');
const policyRoutes = require('./routes/policyRoutes');

const app = express();

connectDB();

app.use(express.json());
app.use('/api/policies', policyRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
