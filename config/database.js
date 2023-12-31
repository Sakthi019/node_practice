const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((con) => { console.log(`MangoDB database connected with host: ${con.connection.host}`) })
    .catch(() => { console.log('not connected') })
}

module.exports = connectDatabase;