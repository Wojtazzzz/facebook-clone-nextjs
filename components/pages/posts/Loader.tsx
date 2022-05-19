import { SingleLoading } from '@components/pages/posts/post/inc/SingleLoading';
import { ListLoader } from '@components/inc/ListLoader';

interface LoaderProps {
    testId?: string;
}

export const Loader = ({ testId = '' }: LoaderProps) => {
    return (
        <ListLoader testId={testId} count={15} styles="flex flex-col gap-4">
            <SingleLoading />
        </ListLoader>
    );
};
