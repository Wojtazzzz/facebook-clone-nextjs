import { CreatePost } from '@components/inc/modals/post/create/createPost/CreatePost';
import { Posts as PostsList } from '@components/inc/posts/Posts';
import { useAuth } from '@hooks/useAuth';
import { getPostsQueryKey } from '@utils/getPostsQueryKey';
import { getPostsEndpoint } from '@utils/getPostsEndpoint';

export const Posts = () => {
    const { user } = useAuth();

    const queryKey = getPostsQueryKey('all', user?.id);
    const endpoint = getPostsEndpoint('all', user?.id);

    return (
        <div className="w-full max-w-[700px] lg:max-w-[550px] xl:max-w-[700px] flex flex-col gap-4 mx-auto p-3 md:p-5">
            <CreatePost queryKey={queryKey} />
            <PostsList queryKey={queryKey} endpoint={endpoint} />
        </div>
    );
};
