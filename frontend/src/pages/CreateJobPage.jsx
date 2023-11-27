import { Box, MenuItem, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import styled from "styled-components"
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { jobTypeLoadAction } from '../redux/actions/jobTypeAction';
import { registerAjobAction } from '../redux/actions/jobAction';

const validationSchema = yup.object({
    title: yup
        .string('Enter a job title')
        .required('title is required'),
    description: yup
        .string('Enter a description')
        .min(6, 'Description should be of minimum 6 characters length')
        .required('Description is required'),
    salary: yup
        .number('Enter a salary')
        .required('Salary is required'),
    location: yup
        .string('Enter a location')
        .required('Location is required'),
    qualification: yup
        .string('Enter qualification')
        .required('qualification is required'),
    jobType: yup
        .string('Enter a Category')
        .required('Category is required'),
    jobMode: yup
        .string('Enter mode of job')
        .required('Job mode is required'),
    disclose: yup
        .boolean('Enter disclose value '),
    skills: yup
        .string('Enter Key Skills')
        .required('Add atleast one skill')    
});


const CreateJobPage = () => {
    const { user } = useSelector(state => state.userProfile);
    const { jobType } = useSelector(state => state.jobTypeAll);
    const [isDisclose,setDisclose]=useState(false);
    const dispatch = useDispatch();

    console.log(jobType);
    //job type
    useEffect(() => {
        const companyName=user?.companyName;
         dispatch(jobTypeLoadAction(companyName));
         
    }, [user]);


    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            salary: '',
            location: '',
            jobType: '',
            jobMode:'',
            skills:'',
            qualification:'',
            discloseSalary:isDisclose,
            companyName:user?.companyName    
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(registerAjobAction(values))
            actions.resetForm();
        },
    });



    return (
        <Wrapper>
                <Box onSubmit={formik.handleSubmit} component="form"  >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <h1 style={{marginBottom:"20px"}}>
                            Register a Job
                        </h1>
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="title"
                            label="Title"
                            name='title'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                        <Button className='gradient'>generate using AI</Button>

                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="skills"
                            name="skills"
                            label="Key skills Required "
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Skills (Node.js,react.js....)"
                            value={formik.values.skills}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.skills && Boolean(formik.errors.skills)}
                            helperText={formik.touched.skills && formik.errors.skills}
                        />

                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="qualification"
                            name="qualification"
                            label="Qualification Required "
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Enter Qualification"
                            value={formik.values.qualification}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.qualification && Boolean(formik.errors.qualification)}
                            helperText={formik.touched.qualification && formik.errors.qualification}
                        />
                        <TextField sx={{ mb: 1 }}
                            fullWidth
                            id="salary"
                            name="salary"
                            label="Salary"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Salary"
                            value={formik.values.salary}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.salary && Boolean(formik.errors.salary)}
                            helperText={formik.touched.salary && formik.errors.salary}
                        />
                        <div className="disclose_box">
                        <button style={isDisclose === true ? { backgroundColor: "#a74cff",color:"white" } : {}} onClick={() => setDisclose(true)}>Disclose</button>
<button style={isDisclose === false ? { backgroundColor: "#a74cff", color:"white" } : {}} onClick={() => setDisclose(false)}>Hide</button>

                        </div>

                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="location"
                            name="location"
                            label="Location"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                        />
                
                <TextField sx={{ mb: 3 }}
                            fullWidth
                            className="px-2 my-2"
                            variant="outlined"
                            name="jobMode"
                            id="jobMode"
                            select
                            label="Mode of Job"
                            value={formik.values.jobMode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.jobMode && Boolean(formik.errors.jobMode)}
                            helperText={formik.touched.jobMode && formik.errors.jobMode}
                        >
                            <MenuItem key={""} value={""}>
                            </MenuItem>

                            <MenuItem  value={"onsite"}>
                                    Onsite
                                </MenuItem>
                            <MenuItem  value={"hybrid"}>
                                    Hybrid
                                </MenuItem>
                            <MenuItem  value={"remote"}>
                                    Remote
                                </MenuItem>
                        </TextField> 


                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            className="px-2 my-2"
                            variant="outlined"
                            name="jobType"
                            id="jobType"
                            select
                            label="Category"
                            value={formik.values.jobType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.jobType && Boolean(formik.errors.jobType)}
                            helperText={formik.touched.jobType && formik.errors.jobType}
                        >
                            <MenuItem key={""} value={""}>

                            </MenuItem>

                            {jobType && jobType.map((cat) => (
                                <MenuItem key={cat._id} value={cat._id}>
                                    {cat.jobTypeName}
                                </MenuItem>
                            ))}
                        </TextField>
                        
                        <Button  className='bright_gradient create-btn' type='submit' >Create job</Button>
                    </Box>
                </Box>
           
        </Wrapper>
    )
}

export default CreateJobPage;

const Wrapper=styled.div`
.disclose_box{
    display:flex;
    column-gap:10px;
    align-self:flex-start;
    margin-bottom:20px;
    button{
        background:#dcc1f6;   
        font-weight:bold;
        color:grey;
    }
}
.create-btn{
    width:100%;
    font-size:18px;
    margin-top:10px;
    font-weight:bold;
}
`

const Button=styled.button`
padding:10px 15px;
align-self:flex-start;
margin-top:-20px;
margin-bottom:20px;
`