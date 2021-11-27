const mongoose = require("mongoose");

mongoose.connect('mogodb://localhost/mydatabase',{
    useNewUrlParse: true,
    useUnifiedTopology: true
})
.then(db => console.log('db conectada', db.connection.host))
.catch(err => console.error(err));