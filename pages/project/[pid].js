import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Skeleton } from "@chakra-ui/react";
import fetcher from "@/utils/fetcher";
import Layout from "@/components/Layout";
import VolunteerSkeleton from "@/components/VolunteerSkeleton";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Text,
  Link,
  Avatar,
  Icon,
  Button,
} from "@chakra-ui/react";
import VolunteerFormModal from "@/components/VolunteerFormModal";

function Proj() {
  const router = useRouter();
  const { pid } = router.query;

  if (!pid) {
    return <></>;
  }

  var data = useSWR("/api/project/" + pid, fetcher).data;
  console.log(data);

  if (data) {
    const {
      authorId,
      url,
      name,
      projectFocus,
      startDate,
      endDate,
      country,
      city,
      requiredVolunteers,
    } = data;

    console.log(name);

    return (
      <Layout>
        <Box backgroundColor="gray.100" h="100vh">
          <Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink>{projectFocus}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  {startDate} to {endDate}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Flex justifyContent="space-between">
              <Heading mb={8}>{name}</Heading>
              {/* <Button
                fontWeight="medium"
                maxW="200px"
                backgroundColor="gray.900"
                color="white"
                _hover={{ bg: "gray.700" }}
                _active={{
                  bg: "gray.800",
                  transform: "scale(0.95)",
                }}
              >
                + Join Project
              </Button> */}
              <VolunteerFormModal >
                + Join Project
              </VolunteerFormModal>
            </Flex>
            <VolunteerSkeleton />
          </Flex>
        </Box>
      </Layout>
    );
  }

  return (
    <Flex justify="center">
      <Skeleton w="80vw" h="400px" />
    </Flex>
  );
}

export default Proj;
