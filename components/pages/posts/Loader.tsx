import { SinglePostLoader } from '@components/pages/posts/post/shared/SinglePostLoader';
import { ListLoader } from '@components/ListLoader';

export const Loader = () => {
    return (
        <ListLoader count={15} styles="flex flex-col gap-4">
            <SinglePostLoader />
        </ListLoader>
    );
};
