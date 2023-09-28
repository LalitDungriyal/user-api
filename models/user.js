const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    postalCode: String,
  });

const userSchema = new mongoose.Schema({
    emailAddress: { type: String, required: true, unique: true },
    businessName: String,
    businessNumber: String,
    uniqueCode: String,
    externalReference: String,
    phoneNum: String,
    homeAddress: addressSchema,
    postalAddress: addressSchema,
    creationDate: { type: Date, default: Date.now },
    modifyDate: { type: Date, default: Date.now },
    archiveDate: Date,
});

module.exports=mongoose.model("User",userSchema);