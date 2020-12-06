import React from 'react';
import {Box, Link, Skeleton} from '@chakra-ui/react';
import {Table, Tr, Th, Td } from './Table';

const SkeletonRow = ({ width }) => (
    <Box as="tr">
            <Td>
    <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
        <Skeleton height="10px" w={width} my={4} />

    </Td>
    <Td>
        <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
        <Skeleton height="10px" w={width} my={4} />
    </Td>
    </Box>
);

const ProjectTableSkeleton = () => {
    return (
        <Table>
        <thead>
        <Tr>
        <Th>Name</Th>
          <Th>Project Link</Th>
          <Th>Project Focus</Th>
          {/* <Th>Date Added</Th> */}
          <Th>Required Volunteers</Th>
          <Th>Start Date</Th>
          <Th>End Date Added</Th>
          <Th>City </Th>
          {/* <Th>Country</Th> */}
          <Th>Volunteers</Th>
          <Th>{''}</Th>
        </Tr>
        </thead>
        <tbody>
        <SkeletonRow width="75px" />
        <SkeletonRow width="125px" />
        <SkeletonRow width="50px" />
        <SkeletonRow width="100px" />
        <SkeletonRow width="75px" />
        <SkeletonRow width="100px" />
        <SkeletonRow width="75px" />
        <SkeletonRow width="75px" />
      </tbody>
    </Table>
    );
};

export default ProjectTableSkeleton;