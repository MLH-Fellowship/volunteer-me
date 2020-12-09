import React from 'react';
import { Box, Link } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';
import { parseISO, format } from 'date-fns';
import { useAuth } from '@/lib/auth';

const toSentenceCase = (camelCaseString) => {
  if (camelCaseString) {
    let result = camelCaseString.replace(/([A-Z])/g, " $1");
    let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  }
  return null;
}
const ProjectTable = ({ projects }) => {
  const auth = useAuth();
  console.log(auth);
  console.log(projects);

  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Project Website</Th>
          <Th>Project Focus</Th>
          {/* <Th>Date Added</Th> */}
          <Th>Required Volunteers</Th>
          <Th>Start Date</Th>
          <Th>End Date Added</Th>
          <Th>Location</Th>
          {/* <Th>Country</Th> */}
          <Th>Volunteers</Th>
          <Th>{""}</Th>
        </Tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <Box as="tr" key={project.url}>
            <Td fontWeight="medium">
              <Link href={"/project/" + project.id}>{project.name}</Link>
            </Td>
            <Td>{project.url}</Td>
            <Td>{toSentenceCase(project.projectFocus)}</Td>
            {/* <Td>{format(parseISO(project.createdAt), 'PPpp')}</Td> */}
            <Td>{project.requiredVolunteers}</Td>
            <Td>{project.startDate}</Td>
            <Td>{project.endDate}</Td>
            <Td>
              {/* {project.city}, {project.country} */}
              {project.address}
            </Td>
            {/* <Td>{project.country}</Td> */}
            <Td>
              <Link>View Volunteers</Link>
            </Td>
          </Box>)

        )}
      </tbody>
    </Table>
  );
};

export default ProjectTable;