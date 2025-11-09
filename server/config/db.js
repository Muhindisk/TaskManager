import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is not defined in environment variables');
      console.log('⚠️  Server will continue but database operations will fail');
      return;
    }

    // Connection options for better stability
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📁 Database: ${conn.connection.name}`);
    console.log(`🔗 Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    console.log('⚠️  Server will continue but database operations will fail');
    
    // Show helpful error messages
    if (error.message.includes('bad auth')) {
      console.log('💡 Tip: Check your MongoDB username and password');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('💡 Tip: Check your internet connection or MongoDB Atlas cluster');
    } else if (error.message.includes('IP')) {
      console.log('💡 Tip: Add your IP to MongoDB Atlas Network Access (allow 0.0.0.0/0 for all IPs)');
    }
    
    // Don't exit in production, let the health check route still work
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
  console.log('💡 Attempting to reconnect...');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ MongoDB connection error: ${err}`);
  console.log('💡 Tip: Check MongoDB Atlas Network Access settings');
});

export default connectDB;
