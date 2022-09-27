import { ProfileLayout } from '@components/layouts/authLayout/mainLayout/profileLayout/ProfileLayout';
import { Friends } from '@components/pages/profile/friends/Friends';
import type { IUserProfile } from '@utils/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

const FriendsPage = (user: IUserProfile) => {
    return (
        <ProfileLayout user={user}>
            <Friends user={user} />
        </ProfileLayout>
    );
};

export default FriendsPage;

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
