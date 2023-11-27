import { Box } from '@mui/material'
import React from 'react'
import Footer from '../component/footer/Footer'
import Nav from '../component/Nav'

const NotFound = () => {
    return (
        <>
            <Nav />
            <Box sx={{ height: '81vh', display: "flex", alignItems: "center", justifyContent: "center" }}>

                <h1>Page not found!</h1>
            </Box>
            <Footer />
        </>
    )
}

export default NotFound