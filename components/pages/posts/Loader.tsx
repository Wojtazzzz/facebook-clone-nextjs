import { SinglePostLoader } from '@components/pages/posts/post/inc/SinglePostLoader';
import { ListLoader } from '@components/inc/ListLoader';

export const Loader = () => {
    return (
        <ListLoader count={15} styles="flex flex-col gap-4">
            <SinglePostLoader />
        </ListLoader>
    );
};
