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

//Getting one user
router.get('/:id',getUser,(req,res)=>{
	res.json(res.user);
});

//Update a user.
router.patch('/:id',getUser,async (req,res)=>{
	
	try{
		const updatedUser=await User.findByIdAndUpdate(res.user.id,req.body,{new: true});
		res.json(updatedUser);
	}catch(err){
		res.status(500).json({message: err.message });
	}

});

//Deleting a user with given ID.

router.delete('/:id',getUser,async (req,res)=>{

	try{
		const deletedUser = await User.findByIdAndRemove(res.user.id);
		res.json({message: "User Deleted Successfully!!"});
	}catch(err){
		res.status(500).json({message: err.message });
	}

});


async function getUser(req,res,next)
{
	try{
		const user=await User.findById(req.params.id);
		if(user==null)
		{
			return res.status(404).json({message: "cannot find user"});
		}
		res.user=user;
		next();
	}catch(err){
		return res.status(500).json({message: "Server error"});
	}
	
}


module.exports=router;
