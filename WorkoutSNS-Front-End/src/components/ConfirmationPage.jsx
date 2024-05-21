import React from 'react';
import {Box, Typography} from '@mui/material';
import logo from "../logo.png";
import { CheckCircle } from '@mui/icons-material';

const ConfirmationPage = () => {

    return (
        <Box my={0}>
            <Box display="flex" justifyContent="center" mb={2}>
                <img src={logo} alt="Logo" style={{ maxWidth: '30%', height: 'auto' }} />
            </Box>
            <Typography variant="h2" align="center" gutterBottom>
                New Post Created Successfully! 
            </Typography>
            <Box display="flex" justifyContent="center" mb={2}>
                <CheckCircle sx={{ fontSize: 100, color: 'green' }} />
            </Box>
        </Box>
    )
}

export default ConfirmationPage;