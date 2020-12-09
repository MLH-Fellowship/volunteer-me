import { useAuth } from "@/lib/auth";
import EmptyState from "@/components/EmptyState";
import DashboardShell from "@/components/DashboardShell";
import ProjectTableSkeleton from "@/components/ProjectTableSkeleton";
import ProjectTable from "@/components/ProjectTable";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import Layout from "@/components/Layout";

const Project = () => {
  const auth = useAuth();

  if(!auth.user){
    return <></>
  }
  const { data } = useSWR("/api/user/" + auth.user.uid, fetcher);
  console.log(auth.user)

  if (!data) {
    return (
      <Layout>
        <DashboardShell>
          <ProjectTableSkeleton />
        </DashboardShell>
      </Layout>
    );
  }

  return (
    <Layout>
      <DashboardShell>
        {data.projectsCreated.length != 0 ? (
          <ProjectTable projects={data.projectsCreated} />
        ) : (
          <EmptyState />
        )}
      </DashboardShell>
    </Layout>
  );
};

export default Project;
