const mongoose =require('mongoose');

const contactSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone_no:{
        type:String,
        required :true
    }
    
});

const Contact =mongoose.model('Contact',contactSchema); //Here Contact is collection name of our contact_list.
//contactSchema is the name of the Schema of Contact Collection.
module.exports = Contact;