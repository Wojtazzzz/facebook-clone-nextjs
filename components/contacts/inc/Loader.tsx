import { SingleLoading } from '@components/contacts/inc/SingleLoading';
import { ListLoader } from '@components/inc/ListLoader';

export const Loader = () => {
    return (
        <ListLoader>
            <SingleLoading />
        </ListLoader>
    );
};
