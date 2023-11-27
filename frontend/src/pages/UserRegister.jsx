import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import horizontalImage from "../assets/images/horizontalImage.jpg"
import verticalImage from "../assets/images/verticalImage.jpg"
import styled from "styled-components"
import Nav from '../component/Nav';
import Footer from '../component/footer/Footer';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { companyUserSignUpAction } from '../redux/actions/companyUserAction'
import { useNavigate } from 'react-router-dom'


const validationSchema = yup.object({
    firstName: yup
        .string('Enter your First Name')
        .min(3, 'First Name should be of minimum 3 characters length')
        .required('First Name is required'),
    lastName: yup
        .string('Enter your Last Name')
        .min(3, 'Last Name should be of minimum 3 characters length')
        .required('Last Name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    
});



const UserRegister = () => { 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {companyUserInfo } = useSelector(state => state.companyUserSignIn);
    useEffect(() => {

        if (companyUserInfo ) {
           navigate("/jobs/candidate/dashboard");
        }

    }, [companyUserInfo])

    
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            //alert(JSON.stringify(values, null, 2));
            dispatch(companyUserSignUpAction(values));
            actions.resetForm();
        }

    })

    return (
        <>
       <Nav />
       <Wrapper>

<div className="login-container">
<div className="left-container">

<img
className="horizontal-img auth-img"
  src={horizontalImage} alt="form image"
></img>
<img
className="vertical-img auth-img"
  src={verticalImage} alt="form image"
></img>


</div>
       
       <Box onSubmit={formik.handleSubmit} component="form" className='right-container' >
       <Box  sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <h2>Welcome Candidate!</h2>
              <p>Register to continue</p>
              <br></br>
              <br></br>
                        
                        <TextField
                            sx={{
                                mb: 3,
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary',
                                },
                                fieldset: { borderColor: "rgb(231, 235, 240)" }
                            }}
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name='firstName'
                            InputLabelProps={{
                                shrink: true,
                            }}

                            placeholder="First Name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                        <TextField
                            sx={{
                                mb: 3,
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary',
                                },
                                fieldset: { borderColor: "rgb(231, 235, 240)" }
                            }}
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name='lastName'
                            InputLabelProps={{
                                shrink: true,
                            }}

                            placeholder="Last Name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                        <TextField
                            sx={{
                                mb: 3,
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary',
                                },
                                fieldset: { borderColor: "rgb(231, 235, 240)" }
                            }}
                            fullWidth
                            id="email"
                            label="E-mail"
                            name='email'
                            InputLabelProps={{
                                shrink: true,
                            }}

                            placeholder="E-mail"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            sx={{
                                mb: 3,
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary'
                                },
                                fieldset: { borderColor: "rgb(231, 235, 240)" }
                            }}
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />

          
<br></br>

                        <Button fullWidth variant="contained" type='submit' >Register</Button>
                    </Box>
                </Box>
                </div>
            </Wrapper>
            <Footer />
        </>
    )
}

export default UserRegister;



const Wrapper = styled.div`
  width:100%;
  display: flex;
 
  justify-content: center;
  background: white;

  .login-container {
    width: 90%; 
    height:100%;
    display: flex;

    @media screen and (max-width:800px){
        flex-direction:column;
    }

    .left-container {
      width: 50%;
      height:100%;
      background: white;
      .auth-img {
       width:100%;
       max-height:100%;
       object-fit:cover;
      }
.vertical-img{
    display:none;
}
      @media screen and (max-width:800px){
        width:100%;
        height:auto; 
        
        .horizontal-img{
            display:none;
        }
        .vertical-img{
            display:block;
        }
      }
    }

    .right-container {
      width: 50%;
      display:flex;
      align-items:center;
      justify-content:center;
      padding: 20px;
      background: white;
      @media screen and (max-width:800px){ 
        width:100%;
      }
    }
  }

  button {
    padding: 15px 0;
  }
`;


