const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');
const CompanyUser = require("../models/companyUserModel");
const path = require("path");
const fs = require("fs");

exports.allUsers = async (req, res, next) => {

  try {
    const users = await CompanyUser.find({ companyName: req.params.companyName }).sort({ createdAt: -1 }).select('-password');
    // .skip(pageSize * (page - 1))
    // .limit(pageSize)

    res.status(200).json({
      success: true,
      users,
      // page,
      // pages: Math.ceil(count / pageSize),
      // count

    })
    next();
  } catch (error) {

    return next(error);
  }
}

//show single user
exports.singleUser = async (req, res, next) => {     //i have to change it hahahahahaha....
  try {
    const user = await CompanyUser.findById(req.params.id);
    res.status(200).json({
      success: true,
      user
    })
    next();

  } catch (error) {
    return next(error);
  }
}

//edit user
exports.editUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      success: true,
      user
    })
    next();

  } catch (error) {
    return next(error);
  }
}

//delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await CompanyUser.findByIdAndRemove(req.params.id);
    res.status(200).json({
      success: true,
      message: "user deleted"
    })
    next();

  } catch (error) {
    return next(error);
  }
}


exports.verifyCompany = async (req, res, next) => {
  try {

    const companyName = req.params.companyName.toLowerCase();

    const user = await User.findOne({ lowercaseCompany: companyName });

    if (!user) {
      return res.status(200).send({ success: false });
    }
    const hasLogo = user.logo ? true : false;
    return res.status(200).send({ success: true, hasLogo: hasLogo });
    
  } catch (error) {
    return next(error);
  }
}

exports.updateProfile = async (req, res, next) => {
  try {

    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { photo } = req.files;
    user.logo = photo || user.logo;
    user.email = req.fields.email || user.email;
    user.companyWebsite = req.fields.companyWebsite || user.companyWebsite;
    user.companyName = req.fields.companyName || user.companyName;
    user.aboutCompany = req.fields.aboutCompany || user.aboutCompany;
    if (photo) {
      user.logo.data = fs.readFileSync(photo.path);
      user.logo.contentType = photo.type;
    }

    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    return next(error);
  }
}
// exports.updateProfile = async (req, res, next) => {
//     try {

//         const user = await User.findById(req.user._id).select('-password');
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//           }
//         const file = req.file?.path; 
//         user.logo =  file || user.logo;
//         user.email= req.body.email || user.email;
//         user.companyWebsite= req.body.companyWebsite || user.companyWebsite;
//         user.companyName= req.body.companyName || user.companyName;
//         user.aboutCompany= req.body.aboutCompany || user.aboutCompany;

//         await user.save();
//         res.status(201).json({ user });
//     } catch (error) {
//         console.log(error);
//         return next(error);
//     }
//     }

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return next(new ErrorResponse("You must log In", 401));
    }

    const file = user.logo;
    const filePath = path.join(__dirname, `../../${file}`);

    // Send both user information and file download in the response
    res.download(filePath);
  } catch (error) {
    return next(error);
  }
}

exports.getCompanyData = async (req, res, next) => {
  try {
    const companyName = req.params.companyName.toLowerCase();
    const user = await User.findOne({ lowercaseCompany: companyName }).select("companyName logo companyWebsite aboutCompany");
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

// get photo
exports.userPhotoController = async (req, res) => {
  try {
    const user = await User.findById(req.params.uid).select("logo");
    if (user.logo.data) {
      res.set("Content-type", user.logo.contentType);
      return res.status(200).send(user.logo.data);
    }
    else res.status(200).json({ message: "logo is not present" })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

// get photo by just the company name 
exports.companyLogoController = async (req, res) => {
  try {
    const companyName = req.params.companyName.toLowerCase();   
    const user = await User.findOne({ lowercaseCompany: companyName }).select("logo");
    if (user.logo.data) {
      res.set("Content-type", user.logo.contentType);
      return res.status(200).send(user.logo.data);
    }
    else res.status(200).json({ message: "logo is not present" })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};