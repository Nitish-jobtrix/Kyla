const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const applicationSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'CompanyUser', 
        required: true,
    },
    appliedAt: {
        type: Date,
        default: Date.now,
    },
   status:{
    type:String,
    default:"inReview"
   }
});

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required'],
        maxlength: 70,
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required'],
    },
    salary: {
        type: String,
        trim: true,
        required: [true, 'Salary is required'],
    },
    location: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true,
    },
    jobType: {
        type: ObjectId,
        ref: 'JobType',
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    jobMode: {
        type: String,
        required: true,
    },
    discloseSalary: {
        type: Boolean,
    },
    skills: {
        type: String,
    },
    qualification: {
        type: String,
    },
    applications: [applicationSchema], // Array to store application information
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
