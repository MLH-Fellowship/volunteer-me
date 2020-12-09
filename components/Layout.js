import React from 'react';
import {
    Box,
} from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
    return (
        <Box backgroundColor="gray.100">
            <Navbar />
            {children}
            <Footer />
        </Box>
    );
}

export default Layout
