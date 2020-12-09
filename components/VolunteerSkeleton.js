import React from "react";
import { Flex, Skeleton } from "@chakra-ui/react";
function VolunteerSkeleton() {
  return (
    <Flex justify="center">
      <Skeleton w="80vw" h="400px" />
    </Flex>
  );
}

export default VolunteerSkeleton;
