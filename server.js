const express = require("express");
const bcrypt = require("bcrypt");
const app = express();


const admin = require("firebase-admin");

var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const db = admin.firestore();

app.post('/signin', async(req,res) => {
    try{
        console.log(req.body);
        // const id = req.body.email;
        const userJson = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        };
        const response = await db.collection("users").add(userJson);
        res.send(response);

        // const salt = bcrypt.genSaltSync(10);
        // const hash = bcrypt.hashSync(req.body.password, salt);

        // const newuser = new userJson({
        //     email: req.body.email,
        //     firstName: req.body.firstName,
        //     lastName: req.body.lastName,
        //     password: hash,
        // });

        // await newuser.save();
    }catch(error){
        res.send(error);
    }
})

app.post('/customerdata', async(req,res) => {
    try{
        console.log(req.body);
        const id = req.body.name;
        const customerJson = {
            name: req.body.name,
            phone_no: req.body.phone_no,
            address: req.body.address
        };
        const response = await db.collection("customerdata").add(customerJson);
        res.send(response);
    }catch(error){
        res.send(error);
    }
})

app.post('/service', async(req,res) => {
    try{
        console.log(req.body);
        const id = req.body.name;
        const serviceJson = {
            serviceprovider: req.body.serviceprovider,
            amount: req.body.amount,
            additional_charge: req.body.additional_charge
        };
        const response = await db.collection("servicedata").add(serviceJson);
        res.send(response);
    }catch(error){
        res.send(error);
    }
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);

})