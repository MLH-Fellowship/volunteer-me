import React from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Link,
  Avatar,
  Icon,
  Button
} from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { GoSignOut } from 'react-icons/go';
import AddProjectModal from './AddProjectModal';
import Footer from '@/components/Footer';

const DashboardShell = ({ children }) => {
  const { user, signout } = useAuth();

  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>Projects</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent="space-between">
          <Heading mb={8}>My Projects</Heading>
          <AddProjectModal>+ Add Project</AddProjectModal>
        </Flex>
        {children}
      </Flex>
      <Footer />
    </Box>
  );
};

export default DashboardShell;
