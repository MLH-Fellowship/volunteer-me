import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmptyState'
import DashboardShell from '@/components/DashboardShell';
import ProjectTableSkeleton from '@/components/ProjectTableSkeleton';
import ProjectTable from '@/components/ProjectTable';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';


const Dashboard = () => {
    const auth = useAuth();
    const { data } = useSWR('/api/projects',fetcher);

    if (!data) {
        return (
            <DashboardShell>
                <ProjectTableSkeleton />
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            {data.projects.length !=0 ? <ProjectTable projects= {data.projects} /> : <EmptyState />}
        </DashboardShell>
    );
};

export default Dashboard;