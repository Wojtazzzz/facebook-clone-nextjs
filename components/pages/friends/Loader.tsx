import * as React from 'react';

import { SingleLoading } from '@components/pages/friends/SingleLoading';


export const Loader: React.FC = () => {
    return (
        <>
            <SingleLoading />
            <SingleLoading />
            <SingleLoading />
            <SingleLoading />
            <SingleLoading />
        </>
    );
}