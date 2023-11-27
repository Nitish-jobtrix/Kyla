import React, { useEffect } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { jobLoadAction } from '../redux/actions/jobAction';
import { deleteAjobAction } from '../redux/actions/jobAction';
import axios from 'axios';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';

const JobsPage = () => {
    const { user } = useSelector(state => state.userProfile);
    const { jobs, loading } = useSelector(state => state.loadJobs);
    
    const dispatch = useDispatch();
   

    useEffect(() => {
       const companyName=user?.companyName;
        dispatch(jobLoadAction(1, "", "", "",companyName));
    }, [user]);

   

    let data = []; 
    data = (jobs !== undefined && jobs.length > 0) ? jobs : []



    //delete job by Id
    const deleteJobById = async (jobId) => {
       dispatch(deleteAjobAction(jobId));
      window.location.reload();
      };

    const columns = [

        {
            field: '_id',
            headerName: 'Job ID',
            width: 150,
            editable: true,
        },
        {
            field: 'title',
            headerName: 'Job name',
            width: 150,
        },
        {
            field: 'jobType',
            headerName: 'Category',
            width: 100,
            valueGetter: (data) => data.row.jobType.jobTypeName
        },
       
        {
            field: 'available',
            headerName: 'available',
            width: 100,
            renderCell: (values => (
                values.row.available ? "Yes" : "No"
            ))

        },

        {
            field: 'salary',
            headerName: 'Salary',
            type: Number,
            width: 100,
            renderCell: (values => (
                "Rs." + values.row.salary
            ))

        },

        {
            field: 'edit',
            headerName: 'Edit',
            width: 80,
            renderCell: (values => (
                <Button style={{padding:"0"}}><Link style={{  textDecoration: "none" }} to={`/job/edit/${values.row._id}`}><i style={{fontSize:"20px"}} className='bx bxs-edit-alt' ></i></Link></ Button>
            ))
        
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 80,
            renderCell: (values => (
                < Button onClick={() => deleteJobById(values.row._id)}  ><i style={{fontSize:"20px",marginTop:"-5px"}} className='bx bxs-trash-alt' ></i></ Button>
            ))
        
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (values => (
                < Button>post on linkedin</ Button>
            ))
        
        },
    ];


    return (
        <Wrapper>
        <Box >
            <Typography variant="h4" sx={{  pb: 3 }}>
                Jobs list
               
            </Typography>
            <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <Button variant='contained' className='create-btn' startIcon={<AddIcon />}> <Link style={{ color: "white", textDecoration: "none" }} to="/job/create">Create Job</Link></Button>
            </Box>
            <Paper sx={{ bgcolor: 'rgb(231 203 222)' }} >

                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        sx={{

                            '& .MuiTablePagination-displayedRows': {
                                color: 'black',
                            },
                            color: 'black',
                            [`& .${gridClasses.row}`]: {
                                bgcolor: "#ccbadc"    //this is row color 
                            },
                            button: {
                                color: 'rgb(134 36 219)'
                            }

                        }}
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                   {/* { jobs && jobs.map((job, i) => (
                                            <p key={i}>{job.title}</p>
                                        ))
                                        } */}
                </Box>
            </Paper>

        </Box>
        </Wrapper>
    )
}

export default JobsPage


const Wrapper=styled.div`
.MuiDataGrid-columnHeaders{
    color:black;
}

.MuiDataGrid-root{
    background: linear-gradient(225deg, hsla(39, 100%, 83%, 1) 0%, hsla(271, 74%, 86%, 1) 69%);
    background: -moz-linear-gradient(225deg, hsla(39, 100%, 83%, 1) 0%, hsla(271, 74%, 86%, 1) 69%);
    background: -webkit-linear-gradient(225deg, hsla(39, 100%, 83%, 1) 0%, hsla(271, 74%, 86%, 1) 69%);
    filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#FFE1A9", endColorstr="#DDC2F6", GradientType=1 );
}
.create-btn{
    background:#8e70a9;
}
`

