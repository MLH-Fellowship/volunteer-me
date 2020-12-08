import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Flex, Skeleton } from "@chakra-ui/react";
import fetcher from "@/utils/fetcher";

function Proj() {
  const router = useRouter();
  const { pid } = router.query;

  if (!pid) {
    return (<></>)
  }

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
  } = useSWR("/api/project/" + pid, fetcher).data;
  console.log(useSWR("/api/project/" + pid, fetcher).data);
  return (
    <Flex justify="center">
      <Skeleton w="80vw" h="400px" />
      {pid}
      {name}
    </Flex>
  );
}

export default Proj;
