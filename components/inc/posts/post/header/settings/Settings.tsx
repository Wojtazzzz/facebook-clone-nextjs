import { useOutsideClick } from '@hooks/useOutsideClick';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/inc/RoundedButton';
import type { IPostType } from '@utils/types';
import { Menu } from './menu/Menu';
import { GlobalMenu } from './menu/globalMenu/GlobalMenu';
import { useSettings } from './useSettings';

interface SettingsProps {
    postId: number;
    type: IPostType;
    commenting: boolean;
}

export const Settings = ({ postId, commenting, type }: SettingsProps) => {
    const { isActive, open, close } = useSettings();
    const ref = useOutsideClick(close);

    return (
        <div className="relative">
            <RoundedButton
                name="Show post settings"
                icon={faEllipsis}
                size={8}
                bgColor="dark-200"
                onHover="bg-dark-100"
                callback={open}
            />

            {isActive && (
                <div
                    aria-label="Settings"
                    ref={ref}
                    className="min-w-[240px] absolute right-0 z-20 bg-dark-300 shadow-md rounded-xl py-3 px-4"
                >
                    <Menu postId={postId} commenting={commenting} closeMenu={close} type={type} />
                    <GlobalMenu />
                </div>
            )}
        </div>
    );
};
