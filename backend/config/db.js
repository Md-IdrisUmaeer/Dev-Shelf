const mongoose = require('mongoose');
const dns = require('dns');

// 🚀 Forces Node's internal network requests to use reliable routing (Keep this, it's great!)
dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
    try {
        // Notice the +srv here. Combined with your dns fix, this should now work beautifully
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log(`🎉 MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
// const mongoose = require('mongoose');

// // PASTE YOUR STRING DIRECTLY HERE FOR A MOMENT (No .env file, just hardcode it to test)
// const dbURI = 'mongodb://miumaeer:eNB1uYJr7KvZdSkP@ac-oxf5nkn-shard-00-00.8r2mtje.mongodb.net:27017,ac-oxf5nkn-shard-00-01.8r2mtje.mongodb.net:27017,ac-oxf5nkn-shard-00-02.8r2mtje.mongodb.net:27017/?ssl=true&replicaSet=atlas-ce3mea-shard-0&authSource=admin&appName=DevShelf';

// console.log("Attempting to connect with URI prefix:", dbURI.substring(0, 25));

// mongoose.connect(dbURI, {
//     serverSelectionTimeoutMS: 5000,
//     family: 4
// })
//     .then(() => console.log("🎉 SUCCESS: Connected to Atlas!"))
//     .catch(err => {
//         console.log("❌ CONNECTION ERROR DETAILS:");
//         console.error(err.message);
//         console.error(err.reason); // This will tell us the exact TLS or handshake reason
//     });
// const mongoose = require('mongoose');
// const dns = require('dns');
// // 🚀 Forces Node's internal network requests to use reliable routing
// dns.setServers(['8.8.8.8', '1.1.1.1']);
// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect('mongodb://miumaeer:eNB1uYJr7KvZdSkP@devshelf.8r2mtje.mongodb.net/?appName=DevShelf', { serverSelectionTimeoutMS: 5000 });
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error(`Database Connection Error: ${error.message}`);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;