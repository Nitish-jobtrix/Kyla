const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
        required: [true, 'first name is required'],
        maxlength: 32,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'last name is required'],
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'e-mail is required'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'password is required'],
        minlength: [6, 'password must have at least (6) caracters'],
    },

    companyName: {
        type: String,
        trim: true,
        required: [true, 'company name is required'],
        maxlength: 32,
    },
    lowercaseCompany:{
        type:String,
        trim:true
    },
    companyWebsite:{
        type:String,
        trim:true,
        default:""
    },
    aboutCompany:{
        type:String,
        default:""
    },
    logo:{ 
        type:String,
        default:""
    }
}, { timestamps: true })

//encrypting password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    // Hash the password
    this.password = await bcrypt.hash(this.password, 10);
  
    // Update lowercaseCompany field
    this.lowercaseCompany = this.companyName.toLowerCase();
  
    next();
  });

// compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// return a JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
}



module.exports = mongoose.model("User", userSchema);