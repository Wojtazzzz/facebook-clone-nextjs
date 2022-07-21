import { useState } from 'react';

import { RoundedButton } from '@components/inc/RoundedButton';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Menu } from '@components/pages/posts/post/inc/settings/menu/Menu';

import type { IPostType } from '@utils/types';

interface SettingsProps {
    postId: number;
    authorId: number;
    type: IPostType;
}

export const Settings = ({ postId, authorId, type }: SettingsProps) => {
    const [isSettingsActive, setIsSettingsActive] = useState(false);

    const handleToggleMenuActive = () => setIsSettingsActive((prevState) => !prevState);
    const handleCloseMenu = () => setIsSettingsActive(false);

    return (
        <div className="relative">
            <RoundedButton
                name="Show post settings"
                icon={faEllipsis}
                size={8}
                bgColor="dark-200"
                onHover="bg-dark-100"
                callback={handleToggleMenuActive}
            />

            {isSettingsActive && <Menu postId={postId} authorId={authorId} closeMenu={handleCloseMenu} type={type} />}
        </div>
    );
};
