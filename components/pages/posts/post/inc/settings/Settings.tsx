import { useState } from 'react';

import { RoundedButton } from '@components/inc/RoundedButton';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Menu } from '@components/pages/posts/post/inc/settings/Menu';

interface SettingsProps {
    postId: number;
}

export const Settings = ({ postId }: SettingsProps) => {
    const [isSettingsActive, setIsSettingsActive] = useState(false);

    return (
        <div className="relative">
            <RoundedButton
                name="Show post settings"
                icon={faEllipsis}
                size={8}
                bgColor="dark-200"
                onHover="bg-dark-100"
                callback={() => setIsSettingsActive((prevState) => !prevState)}
            />

            {isSettingsActive && <Menu postId={postId} closeMenu={() => setIsSettingsActive(false)} />}
        </div>
    );
};
