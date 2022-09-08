import type { IPostType } from '@utils/types';
import { FriendOptions } from './friendOptions/FriendOptions';
import { HiddenOptions } from './hiddenOptions/HiddenOptions';
import { OwnOptions } from './ownOptions/OwnOptions';
import { SavedOptions } from './savedOptions/SavedOptions';

interface OptionsProps {
    postId: number;
    type: IPostType;
    commenting: boolean;
    queryKey: unknown[];
    openUpdateModal: () => void;
    close: () => void;
}

export const Options = ({ postId, type, commenting, queryKey, close, openUpdateModal }: OptionsProps) => {
    const { is_saved, is_hidden, is_own } = type;

    if (is_saved) return <SavedOptions queryKey={queryKey} postId={postId} />;
    if (is_hidden) return <HiddenOptions queryKey={queryKey} postId={postId} />;
    if (is_own)
        return (
            <OwnOptions queryKey={queryKey} commenting={commenting} postId={postId} openUpdateModal={openUpdateModal} />
        );
    return <FriendOptions queryKey={queryKey} postId={postId} closeMenu={close} />;
};
