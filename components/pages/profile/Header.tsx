import * as React from 'react';
import { useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';

import Image from 'next/image';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import { Button } from '@components/Button';

import { AuthMiddleware } from '@enums/AuthMiddleware';


export const Header: React.FC = () => {
    const { user } = useAuth({ middleware: AuthMiddleware.AUTH });

    const FriendsHeadsComponent: React.ReactElement[] = [];

    if (user) {
        user.friends.map(({ id, first_name, last_name, image }) => {
            if (FriendsHeadsComponent.length >= 4) return;

            FriendsHeadsComponent.push(
                <Image
                    key={id}
                    width="32"
                    height="32"
                    src={image}
                    alt={`${first_name} ${last_name}`}
                    title={`${first_name} ${last_name}`}
                    className="rounded-full"
                />
            );
        });
    }

    return (
        <div className="w-full border-b-2 border-dark-100">
            <div className="w-full h-[200px] sm:h-[280px] md:h-[300px] lg:h-[350px] relative">
                <Image
                    layout="fill"
                    src="https://scontent.fktw1-1.fna.fbcdn.net/v/t1.18169-9/11201902_655426647927251_5385839609063367253_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=e3f864&_nc_ohc=mHUrIQh3ZNkAX_G3JIL&_nc_ht=scontent.fktw1-1.fna&oh=00_AT9J5Pb4AvxnxZU0KRUMaUFwlfXEKCXkUhL8cjjetY2aJQ&oe=622F7636"
                    alt="User background"
                    priority
                    className="rounded-b-lg"
                />
            </div>

            <div className="w-full flex flex-col md:flex-row justfy-between -translate-y-10 px-3 xs:px-5 sm:px-8 md:px-10 lg:px-12">
                <div className="w-full flex items-center gap-5">
                    <div className="w-[120px] sm:w-[140px] lg:w-[168px] h-[120px] sm:h-[140px] lg:h-[168px] relative">
                        {user ? (
                            <Image
                                layout="fill"
                                src={user.image}
                                alt="User profile image"
                                className="rounded-full border-4 border-dark-200"
                            />
                        ) : (
                            <SkeletonLoader background="#242526" style={{ width: 168, height: 168 }} circle={true} />
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5 mt-12">
                        {user ? (
                            <>
                                <span className="text-2xl xl:text-3xl text-light-200 font-bold">
                                    {user.first_name} {user.last_name}
                                </span>

                                <span className="xl:text-lg text-light-100 font-medium -my-1.5">
                                    {user.friends.length} Friends
                                </span>

                                <div className="flex">
                                    {FriendsHeadsComponent}
                                </div>
                            </>
                        ) : (
                            <>
                                <SkeletonLoader background="#242526" style={{ width: 180, height: 25 }} />
                                <SkeletonLoader background="#242526" style={{ width: 100, height: 15 }} />
                                <SkeletonLoader background="#242526" style={{ width: 130, height: 30 }} />
                            </>
                        )}
                    </div>
                </div>

                <div className="w-full flex justify-end items-end gap-4 mb-6 mr-6">
                    <div className="w-[130px] xl:w-[155px]">
                        <Button title="Send message" />
                    </div>

                    <div className="w-[130px] xl:w-[155px]">
                        <Button title="Poke" />
                    </div>
                </div>
            </div>
        </div>
    );
}