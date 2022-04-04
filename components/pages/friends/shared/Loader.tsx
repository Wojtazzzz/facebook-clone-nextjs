import { SingleLoading } from '@components/pages/friends/shared/SingleLoading';
import { ListLoader } from '@components/ListLoader';

export const Loader = () => {
    return (
        <ListLoader>
            <SingleLoading />
        </ListLoader>
    );
};
