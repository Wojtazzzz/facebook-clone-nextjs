import * as React from 'react';

import { UserLayout } from '@components/layouts/UserLayout';

import type { NextPage } from 'next';


const Marketplace: NextPage = () => {
    return (
        <UserLayout>
            <div className="bg-gray-600">
                <span className="text-dark-200">Marketplace</span>
            </div>
        </UserLayout>
    )
}

export default Marketplace;
