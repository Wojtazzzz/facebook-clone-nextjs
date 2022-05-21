import { useAuth } from '@hooks/useAuth';

import { CreateLoader } from '@components/pages/posts/post/comments/create/inc/CreateLoader';
import { CreateForm } from '@components/pages/posts/post/comments/create/CreateForm';
import { Avatar } from '@components/inc/Avatar';

interface CreateProps {
    postId: number;
    reloadComments: () => void;
}

export const Create = ({ postId, reloadComments }: CreateProps) => {
    const { user } = useAuth();

    if (!user) return <CreateLoader testId="commentsCreate-loader" />;

    return (
        <div className="flex gap-2 p-3">
            <Avatar src={user.profile_image} size={40} alt="" />
            <CreateForm postId={postId} reloadComments={reloadComments} />
        </div>
    );
};
