//require the library
const mongoose =require('mongoose');

//Connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db');

//acquire the connection(to check if it is successfuly connected to database)
const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,'Error to connecting to database'));

//up and running then print the message 
db.once('open',function(){
    console.log("Successfully Connected to database ");
})
