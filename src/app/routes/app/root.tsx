import { Outlet } from 'react-router';

import { Layout } from '@/components/layout';

export const ErrorBoundary = () => {
    return <div>Something went wrong!</div>;
};

const AppRoot = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default AppRoot;