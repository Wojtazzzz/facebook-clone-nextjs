import { SingleLoading } from '@components/contacts/shared/SingleLoading';
import { ListLoader } from '@components/ListLoader';

export const Loader = () => {
    return (
        <ListLoader>
            <SingleLoading />
        </ListLoader>
    );
};
