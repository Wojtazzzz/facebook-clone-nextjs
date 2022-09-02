import type { IPostType } from '@utils/types';
import { FriendOptions } from './friendOptions/FriendOptions';
import { HiddenOptions } from './hiddenOptions/HiddenOptions';
import { OwnOptions } from './ownOptions/OwnOptions';
import { SavedOptions } from './savedOptions/SavedOptions';

interface OptionsProps {
    postId: number;
    type: IPostType;
    commenting: boolean;
    close: () => void;
}

export const Options = ({ postId, type, commenting, close }: OptionsProps) => {
    const { is_saved, is_hidden, is_own } = type;

    if (is_saved) return <SavedOptions postId={postId} />;
    if (is_hidden) return <HiddenOptions postId={postId} />;
    if (is_own) return <OwnOptions commenting={commenting} postId={postId} />;
    return <FriendOptions postId={postId} closeMenu={close} />;
};
