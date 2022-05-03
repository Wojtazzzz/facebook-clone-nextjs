import { SinglePostLoader } from '@components/pages/posts/post/inc/SinglePostLoader';
import { ListLoader } from '@components/inc/ListLoader';

interface LoaderProps {
    testid?: string;
}

export const Loader = ({ testid = '' }: LoaderProps) => {
    return (
        <div data-testid={testid}>
            <ListLoader count={15} styles="flex flex-col gap-4">
                <SinglePostLoader />
            </ListLoader>
        </div>
    );
};
