import { SingleLoading } from '@components/nav/panel/inc/SingleLoading';
import { ListLoader } from '@components/inc/ListLoader';

interface LoaderProps {
    testId?: string;
}

export const Loader = ({ testId = '' }: LoaderProps) => {
    return (
        <ListLoader testId={testId} count={8}>
            <SingleLoading />
        </ListLoader>
    );
};
