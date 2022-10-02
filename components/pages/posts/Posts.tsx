import { CreatePost } from '@components/inc/createPost/CreatePost';
import { Posts as PostsList } from '@components/inc/posts/Posts';
import { ScrollToTop } from '@components/inc/ScrollToTop';
import { getPostsEndpoint } from '@utils/getPostsEndpoint';
import { getPostsQK } from '@utils/queryKeys';

export const Posts = () => {
    const queryKey = getPostsQK({ type: 'all' });
    const endpoint = getPostsEndpoint({ type: 'all' });

    return (
        <div className="w-full max-w-[700px] lg:max-w-[550px] xl:max-w-[700px] flex flex-col gap-4 mx-auto p-3 md:p-5">
            <CreatePost queryKey={queryKey} />
            <PostsList queryKey={queryKey} endpoint={endpoint} />
            <ScrollToTop />
        </div>
    );
};
