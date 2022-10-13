const express = require('express') ;
const app = express() ;
const cors = require('cors') ;
const mongoose = require('mongoose') ;
const bcrypt = require('bcrypt') ;
const jwt = require('jsonwebtoken') ;
app.use(express.json()) ;
app.use(cors()) ;

const sercretKey = "sriharisingireddy" ;

const singupSchema =  {

username : {
    type : String ,
    required : true 
}, 
email : {
    type : String , 
    required : true 
},
gender : {
    type : String ,
    required : true 
},
password : {
    type : String ,
    required : true
}

} ;

const carSchema = {
    name : {
        type : String ,
        required : true
    },
    model : {
        type : String ,
        required : true
    } ,
    type : {
        type : String , 
        required : true
    },
    price : {
        type : Number ,
        required : true
    }

} ;

const adminSchema = {
    username : {
        type : String ,
        required : true 
    }, 
    email : {
        type : String , 
        required : true 
    },
    gender : {
        type : String ,
        required : true 
    },
    password : {
        type : String ,
        required : true
    } ,
    adminpassword : {
        type : String, 
        required : true
    }
};

const singUpModel = mongoose.model("singup" , singupSchema) ;

const carModel = mongoose.model('carsdata' , carSchema) ;

const adminModel = mongoose.model('adminusers', adminSchema) ;

mongoose.connect("mongodb://localhost:27017/Project1",{ useNewUrlParser: true, useUnifiedTopology: true})
.then( 

    () => console.log("DB is connected") 

).catch(err => console.log(err)) ;


app.post('/register' , async (req,res) =>{   

    console.log(req.body)

    const{username,email,gender,password} = req.body 

    const userData = new singUpModel({
        username :username , 
        email : email, 
        gender : gender , 
        password : password
    })  

    const hashPassword = await bcrypt.hash(req.body.password , 10) 

    userData.password = hashPassword

    try{
        const result = await userData.save() 
        
        if(result){

            return res.json({data : "User register successfully"})

        }
    }
    catch(err){

        return res.json({data : "Username is alredy exists"})
    }
    
    }) ;

app.post('/registerAdmin', async (req,res)=>{
     
    const{username,email,gender,password, adminpassword} = req.body 

    const adminData = new adminModel({
        username : username,
        email : email ,
        gender : gender ,
        password : password ,
        adminpassword : adminpassword
    }) 
    const hashPassword = await bcrypt.hash(password, 10) 

    adminData.password = hashPassword

    const hashAdminPassword = await bcrypt.hash(adminpassword, 10) 

    adminData.adminpassword = hashAdminPassword

    try{
        const result = await adminData.save() 
        
        if(result){

            return res.json({data : "Admin register successfully"})

        }
    }
    catch(err){

        return res.json({data : "Username is alredy exists"})

    }

}) ;

app.post('/login' , async (req,res)=>{ 
 
    const {email,password} = req.body  

    const getUser = await singUpModel.findOne({email : email})  

    const getAdmin = await adminModel.findOne({email : email}) 
    
    if(getAdmin !== null){

        const checkPassword = await bcrypt.compare(password , getAdmin.password);  
        
        if(checkPassword){

            var authToken =  jwt.sign({email : getAdmin.email}, sercretKey, {expiresIn: '24h'}) 

            return res.json({data : "admin" , authToken : authToken})  
            
        }
        else{

            return res.json({data : 'invalid password'})

        }
    } 
    else if(getUser !== null){  

        const checkPassword = await bcrypt.compare(password , getUser.password); 
        
        if(checkPassword){

            var authToken = jwt.sign({email : getUser.email}, sercretKey, {expiresIn: '24h'}) 

            return res.json({data : "user" , authToken : authToken})  
            
        }
        else{

            return res.json({data : 'invalid password'})

        }
       
    } 
    else {
        return res.json({data : "invalid email"})
    }

}) ;



const verifyToken = async (req,res,next)=>{  

    const token = req.headers['authorization'].split(' ')[1] ;  

    if(token != null){   

        jwt.verify(token , sercretKey, (err,  dec) => {

           if(dec){

            return next();

           } 

           if(err){

            return next(err);
            
           }

        }) 
        
    }
    else{ 

        return next('error')

    } 

};


app.get('/getCars', verifyToken, async (req,res)=>{   

        try{

        const getCars = await carModel.find() 

        return res.json({data : getCars}) 

        } 
        catch(err){

            return res.json({data : "error"})

        }
    
})  ;

app.post('/addCar', verifyToken, async(req,res)=>{

    const{name,model,type,price} = req.body 

    const data = new carModel({
        name : name ,
        model : model , 
        type : type , 
        price: price 
    }) 

    try{ 

    await data.save() 

    res.send({data : "Car added successfully"})

    } 
    catch(err){

        res.send({data : "error"})
    }

}) ;

app.delete('/deleteCar/:id', verifyToken, async(req,res)=>{  

    const id = req.params.id;

    try{  

     await carModel.deleteOne({_id : id}) 

        return res.json({data : "Car deleted successfully"})  

    } 
    catch(err){

       return  res.json({data : "error" })
    } 

}) ; 

app.put('/updateCar', verifyToken , async(req,res)=>{

    const{id,name,model,type,price} = req.body 
  
    try{

        await carModel.updateOne({_id : id}, {$set : {name : name , model : model, type : type, price : price}}) 

        return res.send({data : "Car Updated Successfully"})

    } 
    catch(err){

        return res.send({data : "error"})

    }

});

app.listen(4000 , ()=>{

    console.log("Server is Running")

});