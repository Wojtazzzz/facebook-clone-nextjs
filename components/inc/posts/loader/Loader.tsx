import { ListLoader } from '@components/inc/ListLoader';
import { SingleLoading } from './SingleLoading';

export const Loader = () => {
    return (
        <ListLoader testId="posts-loadingLoader" count={15} styles="flex flex-col gap-2 md:gap-3">
            <SingleLoading />
        </ListLoader>
    );
};
