import { useAuth } from '@hooks/useAuth';
import { Avatar } from '@components/inc/Avatar';
import { Loader } from './Loader';
import { Form } from './form/Form';

interface CreateProps {
    postId: number;
}

export const Create = ({ postId }: CreateProps) => {
    const { user } = useAuth();

    if (!user) return <Loader />;

    return (
        <div className="flex gap-2 p-1">
            <div>
                <Avatar src={user.profile_image} alt="" styles="w-[40px] h-[40px]" />
            </div>

            <Form postId={postId} />
        </div>
    );
};
