import React from 'react';
import {
    Box,
} from '@chakra-ui/react';
import Navbar from './Navbar';

function Layout({ children }) {
    return (
        <Box backgroundColor="gray.100">
            <Navbar />
            {children}
        </Box>
    );
}

export default Layout
