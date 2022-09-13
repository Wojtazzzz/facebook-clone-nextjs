import { AuthLayout } from '@components/layouts/authLayout/AuthLayout';
import { Profile as ProfileComponent } from '@components/pages/profile/Profile';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { IProfileFriendsData, IUserProfile } from '@utils/types';

interface ProfileProps {
    user: IUserProfile;
    friends: IProfileFriendsData;
}

export default function Profile({ user, friends }: ProfileProps) {
    return (
        <AuthLayout>
            <ProfileComponent user={user} friends={friends} />
        </AuthLayout>
    );
}

interface IParams extends ParsedUrlQuery {
    id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params as IParams;

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/next/profiles/${id}`);

    if (response.status === 404) {
        return {
            notFound: true,
        };
    }

    const data = await response.json();

    return {
        props: data,
        revalidate: 1,
    };
};

type UserId = {
    id: number;
};

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/next/profiles`);
    const data = await response.json();

    const paths = data.map(({ id }: UserId) => ({
        params: { id: id.toString() },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
};
