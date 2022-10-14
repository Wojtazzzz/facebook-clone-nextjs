import type { QueryKey } from '@tanstack/react-query';
import type { IPostType } from '@utils/types';
import { FriendOptions } from './friendOptions/FriendOptions';
import { HiddenOptions } from './hiddenOptions/HiddenOptions';
import { OwnOptions } from './ownOptions/OwnOptions';
import { SavedOptions } from './savedOptions/SavedOptions';

interface OptionsProps {
    postId: number;
    type: IPostType;
    commenting: boolean;
    queryKey: QueryKey;
    openUpdateModal: () => void;
    close: () => void;
}

export const Options = ({ type, commenting, close, openUpdateModal, ...rest }: OptionsProps) => {
    const { is_saved, is_hidden, is_own } = type;

    if (is_saved) return <SavedOptions {...rest} />;
    if (is_hidden) return <HiddenOptions {...rest} />;
    if (is_own) return <OwnOptions commenting={commenting} openUpdateModal={openUpdateModal} {...rest} />;
    return <FriendOptions closeMenu={close} {...rest} />;
};
