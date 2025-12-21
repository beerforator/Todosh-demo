import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Typography variant="h2" gutterBottom>Добро пожаловать в Todosh</Typography>
            <Button variant="contained" component={Link} to="/login">Войти</Button>
        </Box>
    );
};