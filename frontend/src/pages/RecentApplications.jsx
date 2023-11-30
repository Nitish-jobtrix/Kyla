import React, { useEffect } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { jobLoadAction } from '../redux/actions/jobAction';
import { deleteAjobAction } from '../redux/actions/jobAction';
import styled from '@emotion/styled';

const RecentApplications = () => {
    const { user } = useSelector(state => state.userProfile);
    const { jobs, loading } = useSelector(state => state.loadJobs);

    const dispatch = useDispatch();


    useEffect(() => {
        const companyName = user?.companyName;
        dispatch(jobLoadAction(1, "", "", "", companyName));
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
            width: 150,
            valueGetter: (data) => data.row.jobType.jobTypeName
        },


        {
            field: 'salary',
            headerName: 'Salary',
            type: Number,
            width: 150,
            renderCell: (values => (
                "Rs." + values.row.salary
            ))

        },
        {
            field: 'applicants',
            headerName: 'Applicants',
            width: 150,
            renderCell: (values => (
                <Link to={`/job/applicants/${values.row._id}`}><Button>view</Button></Link>
            ))

        },
        {
            field: 'shortlisted',
            headerName: 'Shortlisted',
            width: 150,
            renderCell: (values => (
                <Link to={`/job/applicants/${values.row._id}/shortlisted`}><Button>view</Button></Link>
            ))

        },
    ];





    return (
        <Wrapper>
            <Box >
                <div >
                    <h2>Jobs list</h2>
                    <p>View applications of all the job you posted</p>

                </div>
                <br />
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

export default RecentApplications;


const Wrapper = styled.div`
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

