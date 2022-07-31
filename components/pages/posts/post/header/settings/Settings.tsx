import { useState } from 'react';
import { useOutsideClick } from '@hooks/useOutsideClick';

import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Menu } from '@components/pages/posts/post/header/settings/menu/Menu';
import { GlobalMenu } from '@components/pages/posts/post/header/settings/menu/globalMenu/GlobalMenu';
import { RoundedButton } from '@components/inc/RoundedButton';

import type { IPostType } from '@utils/types';

interface SettingsProps {
    postId: number;
    type: IPostType;
    reloadPosts: () => void;
}

export const Settings = ({ postId, type, reloadPosts }: SettingsProps) => {
    const [isActive, setIsActive] = useState(false);

    const handleToggleMenuActive = () => setIsActive((prevState) => !prevState);
    const handleCloseMenu = () => setIsActive(false);

    const ref = useOutsideClick(handleCloseMenu);

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

            {isActive && (
                <div
                    aria-label="Settings"
                    ref={ref}
                    className="min-w-[240px] absolute right-0 z-20 bg-dark-300 shadow-md rounded-xl py-3 px-4"
                >
                    <Menu postId={postId} closeMenu={handleCloseMenu} type={type} reloadPosts={reloadPosts} />
                    <GlobalMenu />
                </div>
            )}
        </div>
    );
};
