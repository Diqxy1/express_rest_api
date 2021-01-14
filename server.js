const express = require('express');
const mongoose = require('mongoose');
const {MONGO_URI} = require('./config')

// Routes
const postsRoutes = require('./routes/api/posts');

const app = express();

// BodyParser Middleware
app.use(express.json()); 

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log('MongoDb conected!'))
    .catch(err => console.log(err));

// User routes
app.use('/api/posts', postsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is run ${PORT}`));