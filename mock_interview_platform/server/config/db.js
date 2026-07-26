const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mock_interview_db';
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    console.log('👉 Make sure MongoDB is running locally on mongodb://127.0.0.1:27017 or set MONGO_URI in .env');
    throw error;
  }
};

module.exports = connectDB;
