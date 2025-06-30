const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const userRoutes = require('./routes/user');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

sequelize.sync().then(() => {
    console.log('Database connected');
    app.listen(process.env.PORT, () =>
        console.log(`Server running on port ${process.env.PORT}`)
    );
});
