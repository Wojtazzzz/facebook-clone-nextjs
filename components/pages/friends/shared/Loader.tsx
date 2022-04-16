import { SingleLoading } from '@components/pages/friends/shared/SingleLoading';
import { ListLoader } from '@components/ListLoader';

interface LoaderProps {
    testid?: string;
}

export const Loader = ({ testid = '' }: LoaderProps) => {
    return (
        <div data-testid={testid}>
            <ListLoader>
                <SingleLoading />
            </ListLoader>
        </div>
    );
};
