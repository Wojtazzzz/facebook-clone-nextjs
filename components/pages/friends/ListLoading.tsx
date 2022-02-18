import * as React from 'react';

import { SingleLoading } from '@components/pages/friends/SingleLoading';


export const ListLoading: React.FC = () => {
    const SingleLoadingsComponents: JSX.Element[] = [];

    for (let i = 0; i < 10; i++) {
        SingleLoadingsComponents.push(<SingleLoading />);
    }

    return <>{SingleLoadingsComponents}</>
}