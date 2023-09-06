const mongoose = require('mongoose');

mongoose.connect(process.env.ORMONGO_URL || 'mongodb://127.0.0.1:27017/text-adventure');

module.exports = mongoose.connection;