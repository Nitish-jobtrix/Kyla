import React, { useEffect } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { allUserAction } from '../redux/actions/userAction';
import styled from '@emotion/styled';

const UsersPage = () => {
    const { user } = useSelector(state => state.userProfile);
    const { users, loading } = useSelector(state => state.allUsers);
    const dispatch = useDispatch();


    useEffect(() => {
        const companyName=user?.companyName;

        dispatch(allUserAction(companyName));
    }, [user]);


    let data = [];
    data = (users !== undefined && users.length > 0) ? users : []

    const deleteUserById = ( id) => {
        console.log(id);
    }

    const columns = [

        {
            field: '_id',
            headerName: 'User ID',
            width: 150,
            editable: true,
        },

        {
            field: 'email',
            headerName: 'E_mail',
            width: 150,
        },

        {
            field: 'createdAt',
            headerName: 'Creation date',
            width: 150,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
            )
        },

        {
            field: 'appliedJobsLink',
            headerName: 'Applied Jobs',
            width: 150,
            renderCell: (params) => (
                <Link to={`/appliedjobs/user/${params.row._id}`}>View Jobs</Link>
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
                < Button onClick={() => deleteUserById(values.row._id)}  ><i style={{fontSize:"20px",marginTop:"-5px"}} className='bx bxs-trash-alt' ></i></ Button>
            ))
        
        },
        
    ];

    return (
        <Wrapper>
            <Box >

                <Typography variant="h4" sx={{ pb: 3 }}>
                    All users
                </Typography>
                <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                    <Button variant='contained' className='create-btn' startIcon={<AddIcon />}> Create user</Button>
                </Box>
                <Paper sx={{ bgcolor: 'rgb(231 203 222)' }} >

                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
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
                            getRowId={(row) => row._id}
                            rows={data}
                            columns={columns}
                            pageSize={3}
                            rowsPerPageOptions={[3]}
                            checkboxSelection
                            slots={{ toolbar: GridToolbar }}
                        />
                    </Box>
                </Paper>

            </Box>
        </Wrapper>
    )
}

export default UsersPage;

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