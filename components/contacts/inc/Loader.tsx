import { SingleLoading } from '@components/contacts/inc/SingleLoading';
import { ListLoader } from '@components/inc/ListLoader';

interface LoaderProps {
    testId?: string;
}

export const Loader = ({ testId }: LoaderProps) => {
    return (
        <ListLoader testId={testId} count={20}>
            <SingleLoading />
        </ListLoader>
    );
};
