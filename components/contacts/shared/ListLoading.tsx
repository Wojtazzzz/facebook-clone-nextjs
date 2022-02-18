import * as React from 'react';

import { SingleLoading } from '@components/contacts/shared/SingleLoading';


export const ListLoading: React.FC = () => {
    const SingleLoadingsComponents: JSX.Element[] = [];

    for (let i = 0; i < 10; i++) {
        SingleLoadingsComponents.push(<SingleLoading key={i} />);
    }

    return <>{SingleLoadingsComponents}</>
}