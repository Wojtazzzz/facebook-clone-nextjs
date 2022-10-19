import { ToggleCommenting } from './toggleCommenting/ToggleCommenting';
import { Delete } from './delete/Delete';
import { Update } from './update/Update';
import type { QueryKey } from '@tanstack/react-query';

interface OwnOptionsProps {
    postId: number;
    commenting: boolean;
    queryKey: QueryKey;
    openUpdateModal: () => void;
}

export const OwnOptions = ({ postId, commenting, queryKey, openUpdateModal }: OwnOptionsProps) => {
    return (
        <>
            <Update openUpdateModal={openUpdateModal} />
            <ToggleCommenting postId={postId} commenting={commenting} queryKey={queryKey} />
            <Delete postId={postId} queryKey={queryKey} />
        </>
    );
};
