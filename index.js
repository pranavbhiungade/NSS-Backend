const express = require('express');
const mongoose = require('mongoose');
const app = express();
const activityRoutes = require('./routes/activity'); // Adjust the path if necessary
const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use('/api', activityRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => console.log('DB connected Successfully'))
.catch(err => console.error('Could not connect to MongoDB', err));


