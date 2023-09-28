const express = require('express')
const router=express.Router()
const User=require('../models/user');

//Getting all Users
router.get('/',async (req,res)=>{
	try{
		const users = await User.find()
		res.json(users);
	}
	catch(err){
		res.status(500).json({message: err.message});
	}
});


//Create a User
router.post('/',async (req,res)=>{
	const user= new User({
		"emailAddress": req.body.emailAddress,
        "businessName": req.body.businessName,
		"businessNumber": req.body.businessNumber,
		"uniqueCode": req.body.uniqueCode,
		"externalReference": req.body.externalReference,
		"phoneNum": req.body.phoneNum,
		"homeAddress": {
			"street": req.body.homeAddress.street,
			"city": req.body.homeAddress.city,
			"state": req.body.homeAddress.state,
			"postalCode":  req.body.homeAddress.postalCode
		},
		"postalAddress": {
			"street": req.body.postalAddress.street,
			"city": req.body.postalAddress.city,
			"state": req.body.postalAddress.state,
			"postalCode":  req.body.postalAddress.postalCode
		},
		"creationDate": req.body.creationDate,
		"modifyDate": req.body.modifyDate,
		"achieveDate": req.body.achieveDate
	});
	
	try{
		const newUser = await user.save();
		res.status(201).json(newUser);
	}
	catch(err){
		res.status(500).json({message: err.message });
	}
});


module.exports=router;
