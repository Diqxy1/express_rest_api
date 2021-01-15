const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { errors } = require('celebrate');
const {MONGO_URI} = require('./config');

// Routes
const postsRoutes = require('./routes/api/posts');
const authRoutes = require('./routes/api/users');
const projectRoutes = require('./routes/api/projects');

const app = express();

// BodyParser Middleware
app.use(express.json()); 

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => console.log('MongoDb conected!'))
    .catch(err => console.log(err));

// User routes
app.use('/api/posts', postsRoutes);
app.use('/api/users', authRoutes);
app.use('/api/projects', projectRoutes);
app.use(errors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is run ${PORT}`));