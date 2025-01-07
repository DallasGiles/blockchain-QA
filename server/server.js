const app = require('./app');
const dotenv = require('dotenv');

//load env 
dotenv.config();


//init connection to DB
const connectDB = require('./config/dbConfig');
connectDB();

//
const PORT = process.env.PORT || 9099;

app.listen(PORT, () => {
    console.log(`Server is active on port ${PORT}`);
});