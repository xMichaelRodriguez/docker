const mongoose = require("mongoose");

mongoose.connect('mogodb://localhost/mydatabase')
.then(db => console.log('db conectada', db.connection.host))
.catch(err => console.error(err));