import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Flex, Skeleton } from "@chakra-ui/react";
import fetcher from "@/utils/fetcher";
import Layout from "@/components/Layout";
import DashboardShell from "@/components/DashboardShell";

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
        {name}
        <Flex justify="center">
          <Skeleton w="80vw" h="400px" />
        </Flex>
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
