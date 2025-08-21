export const paths = {
    app: {
        root: {
            path: '/',
            getHref: () => '/',
        },
        focus: {
            path: '/',
            getHref: () => '/',
        },
        garden: {
            path: 'garden',
            getHref: () => '/garden',
        }
    },
} as const;