import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export const LoginPage = () => {
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4">Вход</Typography>
            <Button variant="contained" sx={{ mt: 2 }}>Войти</Button>
        </Box>
    );
};