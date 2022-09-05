import { TurnOffComments } from './turnOffComments/TurnOffComments';
import { TurnOnComments } from './turnOnComments/TurnOnComments';
import { Delete } from './delete/Delete';

interface OwnOptionsProps {
    postId: number;
    commenting: boolean;
    queryKey: unknown[];
}

export const OwnOptions = ({ postId, commenting, queryKey }: OwnOptionsProps) => {
    return (
        <>
            {commenting ? (
                <TurnOffComments postId={postId} queryKey={queryKey} />
            ) : (
                <TurnOnComments postId={postId} queryKey={queryKey} />
            )}

            <Delete postId={postId} queryKey={queryKey} />
        </>
    );
};
