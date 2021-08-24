const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose'); //Connecting to database
const Contact =require('./models/contact');

const app =express(); //all function of express() module is present in app variable.

//Video :17 Setting up a template engine.
//1.Install and Set up view engine.
//2.Setup Views path.
//3.Make Views folder and its files.
//4.Render response from views. 
//Setting View of app(Here we use EJS template for view setup)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded()); //app.use() signifies Middleware. (Parser)
app.use(express.static('assets'));//accessing static files using middleware.

//Creating a Contact List
var contactList=[{
    name:'Yash',
    phone_no:'1234567891'
    },
    {
        name :'Parikh',
        phone_no:'234567908'

    },
    {
    name:'Ravi',
    phone_no:'1234567811'
    }
]



//Returning Response From Express Server  //Fetching Data from database.
app.get('/',function(req,res){
    //res.send('Oops ! It is running.');
    //Video 17

    Contact.find({},function(err,contacts){
        if(err)
        {
            console.log("Error In Fetching Data From Database.");
            return;
        }

        return res.render('home',{
            title:'My Contact list',  //sending data from index.js to home.ejs
            contact_list: contacts});

    });


})

app.get('/practice',function(req,res){
    return res.render('practice',{title:"Play with EJS"});
})


app.post('/create-contact',function(req,res){  //receiving data from form and redirecting to practice page.
    //return res.redirect('/practice');
    
    /*contactList.push({      //contactList.push(req.body); 
        name: req.body.name,
        phone_no: req.body.phone_no
    })*/
    Contact.create({               //It is used to create contact in database .
        name:req.body.name,
        phone_no:req.body.phone_no
    },function(err,newContact){
        if(err)
        {
            console.log('Error in Creating a Contact !');
            return;
        }
        console.log('****',newContact,'****');
        return res.redirect('back');
    })

    //return res.redirect('back'); //back='/' 
})

// // Through Params:
// app.get('/delete-contact/:phone', function(req, res){
//     console.log(req.params);
//     let phone = req.params.phone_no;



app.get('/delete-contact/',function(req,res){
    
    /* Without using database: */
    //let phone=req.params.phone_no;
    /*let phone = req.query.phone_no;
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    if(contactIndex != -1){
        contactList.splice(contactIndex, 1);
     }
    return res.redirect('back'); */

    //Deleting From Database
    //Get the id from query in url
    let id = req.query.id;
    //find the contact in database using id and delete it.
    //Callback function + Delete
    Contact.findByIdAndDelete(id,function(err){
        if(err)
        {
            console.log('Error in deleting the contact from database.');
            return;
        }
        
        return res.redirect('back');
    })


}) 

app.listen(port,function(err){  //Server is listen the request from client.
    if(err){
        console.log("Error in running the server : ",err);
    }
    console.log("Server is running on port no : ",port);
})