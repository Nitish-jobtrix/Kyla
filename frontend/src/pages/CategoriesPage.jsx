import React, { useEffect } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { jobTypeLoadAction } from '../redux/actions/jobTypeAction';

import moment from 'moment'
import styled from '@emotion/styled';


const CategoriesPage = () => {

    const { user } = useSelector(state => state.userProfile);
    const { jobType, loading } = useSelector(state => state.jobTypeAll);
    const dispatch = useDispatch();

    useEffect(() => {
        const companyName=user?.companyName;
        dispatch(jobTypeLoadAction(companyName));
    }, [user]);


    let data = [];
    data = (jobType !== undefined && jobType.length > 0) ? jobType : []

    //delete job by Id
    const deleteJobCategoryById = (id) => {
        console.log(id)
    }

    const columns = [

        {
            field: '_id',
            headerName: 'Category ID',
            width: 150,
            editable: true,
        },
        {
            field: 'jobTypeName',
            headerName: 'Category',
            width: 150,
        },
        {
            field: 'createdAt',
            headerName: 'Create At',
            width: 150,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD ')
            )

        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 120,
            renderCell: (values => (
                <Button style={{padding:"0"}}><Link style={{  textDecoration: "none" }} to={`/admin/edit/user/${values.row._id}`}><i style={{fontSize:"20px"}} className='bx bxs-edit-alt' ></i></Link></ Button>
            ))
        
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 120,
            renderCell: (values => (
                < Button onClick={() => deleteJobCategoryById(values.row._id)}  ><i style={{fontSize:"20px",marginTop:"-5px"}} className='bx bxs-trash-alt' ></i></ Button>
            ))
        
        },
       
    ];


    return (
        <Wrapper>
        <Box >

            <Typography variant="h4" sx={{  pb: 3 }}>
                Jobs category 
            </Typography>
            <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <Button className='create-btn' variant="contained"  startIcon={<AddIcon />}><Link style={{ color: "white", textDecoration: "none" }} to='/categories/create'>Create category</Link></ Button>
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
                                bgcolor: "#ccbadc" 
                            },
                            button: {
                                color: 'rgb(134 36 219)'
                            }

                        }}
                        rows={data}
                        columns={columns}
                        pageSize={3}
                        rowsPerPageOptions={[3]}
                        checkboxSelection
                    // components={{ Toolbar: GridToolbarExport }}
                    />
                </Box>
            </Paper>

        </Box>
        </Wrapper>
    )
}

export default CategoriesPage;

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