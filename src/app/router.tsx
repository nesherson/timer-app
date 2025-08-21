import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import { paths } from '@/config/paths';

import {
    default as AppRoot,
    ErrorBoundary as AppRootErrorBoundary,
} from './routes/app/root';

const convert = (queryClient: QueryClient) => (m: any) => {
    const { clientLoader, clientAction, default: Component, ...rest } = m;
    return {
        ...rest,
        loader: clientLoader?.(queryClient),
        action: clientAction?.(queryClient),
        Component,
    };
};

export const createAppRouter = (queryClient: QueryClient) =>
    createBrowserRouter([
        {
            path: paths.app.root.path,
            element: (
                <AppRoot />
            ),
            ErrorBoundary: AppRootErrorBoundary,
            children: [
                {
                    index: true,
                    path: paths.app.timers.path,
                    lazy: () =>
                        import('./routes/app/timers').then(
                            convert(queryClient),
                        ),
                }
            ],
        },
        {
            path: '*',
            lazy: () => import('./routes/not-found').then(convert(queryClient)),
        },
    ]);

export const AppRouter = () => {
    const queryClient = useQueryClient();

    const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

    return <RouterProvider router={router} />;
};