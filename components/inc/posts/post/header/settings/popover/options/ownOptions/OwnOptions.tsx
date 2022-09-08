import { TurnOffComments } from './turnOffComments/TurnOffComments';
import { TurnOnComments } from './turnOnComments/TurnOnComments';
import { Delete } from './delete/Delete';
import { Update } from './update/Update';

interface OwnOptionsProps {
    postId: number;
    commenting: boolean;
    queryKey: unknown[];
    openUpdateModal: () => void;
}

export const OwnOptions = ({ postId, commenting, queryKey, openUpdateModal }: OwnOptionsProps) => {
    return (
        <>
            <Update openUpdateModal={openUpdateModal} />

            {commenting ? (
                <TurnOffComments postId={postId} queryKey={queryKey} />
            ) : (
                <TurnOnComments postId={postId} queryKey={queryKey} />
            )}

            <Delete postId={postId} queryKey={queryKey} />
        </>
    );
};
