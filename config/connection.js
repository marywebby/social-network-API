// requirering mongoose
const { connect, connection } = require('mongoose');

// creating mongoose connection string, this will be running through local host if the user were to use the UI  
const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost/socialnetworkDB';

// creating the connection between the url location and the user about to use it 
connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// exporting connection to use in other files 
module.exports = connection;
