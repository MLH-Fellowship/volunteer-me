import React from 'react';
import { Heading, Flex, Text,Button } from '@chakra-ui/react';


import DashboardShell from './DashboardShell';
import AddProjectModal from './AddProjectModal';

const EmptyState = () => (
      // <DashboardShell>
      <Flex
        width="100%"
        backgroundColor="white"
        borderRadius="8px"
        p={16}
        justify="center"
        align="center"
        direction="column"
      >
        <Heading size="lg" mb={2}>
          You haven’t added any projects.
        </Heading>
        <Text mb={4}>Let’s get started.</Text>
        <AddProjectModal>Add Your First Project</AddProjectModal>
      </Flex>
      // </DashboardShell>

  );

  export default EmptyState;