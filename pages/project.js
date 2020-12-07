import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmptyState'
import DashboardShell from '@/components/DashboardShell';
import ProjectTableSkeleton from '@/components/ProjectTableSkeleton';
import ProjectTable from '@/components/ProjectTable';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';
import Layout from '@/components/Layout';

const Project = () => {
    const auth = useAuth();
    const { data } = useSWR('/api/projects', fetcher);
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
                {data.projects.length != 0 ? <ProjectTable projects={data.projects} /> : <EmptyState />}
            </DashboardShell>
        </Layout>
    );
};

export default Project;