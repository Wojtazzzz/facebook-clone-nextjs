import { Profile as ProfileComponent } from '@components/pages/profile/Profile';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { IUserProfile, NextPageWithLayout } from '@utils/types';
import { ProfileLayout } from '@components/layouts/authLayout/mainLayout/ProfileLayout';

interface ProfileProps extends IUserProfile {}

const ProfilePage: NextPageWithLayout<ProfileProps> = (user) => {
    return (
        <ProfileLayout user={user}>
            <ProfileComponent user={user} />;
        </ProfileLayout>
    );
};

export default ProfilePage;

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
