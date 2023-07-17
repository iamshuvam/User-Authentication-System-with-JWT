const express = require("express");
const mongoose = require("mongoose");
const routes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const { requireAuth,checkUser } = require('./middleware/authMiddleware');
const port = 3000;

const app = express();

//middlewere 

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());


// view engine
app.set('view engine', 'ejs')


//database conection
// const dbURI= "mongodb+srv://shuvam:12345@cluster0.amyahlm.mongodb.net/node-auth";
// mongoose.connect(dbURI)


// .then((result) => app.get(8080))
//  .catch((err)=> console.log(err));
const db_url = "mongodb+srv://shuvam:12345@cluster0.amyahlm.mongodb.net/node-auth"

async function connectDb(){
    try{
        await mongoose.connect(db_url)
        console.log("Connection successful")
    }
    catch(err){
        console.log(err)
    }
}             
        
app.listen(port,async ()=>{
    await connectDb()
    console.log(`Server listening on port : ${port} `)
}) 




 //routes 
 app.get('*', checkUser);
 app.get('/',(req,res)=> res.render('home'));
 app.get('/smoothies',requireAuth,(req,res)=>res.render('smoothies'));
 app.use(routes);



 