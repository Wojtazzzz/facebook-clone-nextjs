import { SingleLoading } from '@components/pages/friends/inc/SingleLoading';
import { ListLoader } from '@components/inc/ListLoader';

interface LoaderProps {
    testId?: string;
}

export const Loader = ({ testId = '' }: LoaderProps) => {
    return (
        <ListLoader testId={testId}>
            <SingleLoading />
        </ListLoader>
    );
};
