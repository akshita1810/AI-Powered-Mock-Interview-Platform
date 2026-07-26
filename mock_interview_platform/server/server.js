require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.log('⚠️ Database connection warning. Proceeding in Demo Mode (In-Memory Auth & Sessions).');
  }

  app.listen(PORT, () => {
    console.log(`🚀 Mock Interview Server running on http://localhost:${PORT}`);
  });
};

startServer();
