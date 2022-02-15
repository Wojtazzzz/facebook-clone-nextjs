import * as React from 'react';
import { useAuth } from '@hooks/useAuth';

import Link from 'next/link';
import Image from 'next/image';
import { UserLayout } from '@components/layouts/UserLayout';
import { Button } from '@components/Button';

import { AuthMiddleware } from '@enums/AuthMiddleware';

import type { NextPage } from 'next';


const Friends: NextPage = () => {
    const { user } = useAuth(AuthMiddleware.AUTH);

    const FriendsComponent: React.ReactFragment[] = [];

    if (user) {
        user.friends.map(({ id, first_name, last_name, profile_image }) => {
            FriendsComponent.push(
                <Link
                    key={id}
                    href={`/profile/${id}`}
                >
                    <a className="flex items-center gap-5 hover:bg-dark-100 rounded-lg transition-colors py-3 px-5">
                        <div>
                            <Image
                                width="80"
                                height="80"
                                src={profile_image}
                                alt={`${first_name} profile image`}
                                className="rounded-full"
                            />
                        </div>

                        <span className="md:text-xl text-light-200 font-medium">{first_name} {last_name}</span>

                        <div className="w-[150px] -mt-5 ml-auto">
                            <Button title="Send message" />
                        </div>
                    </a>
                </Link>
            );
        });
    }

    return (
        <UserLayout>
            <div className="flex flex-col gap-6 text-black py-5 px-2">
                {user
                    ? FriendsComponent
                    : (
                        <span>Loading</span>
                    )}
            </div>
        </UserLayout >
    )
}

export default Friends;
