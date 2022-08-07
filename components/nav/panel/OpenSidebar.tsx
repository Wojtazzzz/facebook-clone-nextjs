import { RoundedButton } from '@components/inc/RoundedButton';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '@hooks/redux';
import { toggleActive } from '@redux/slices/SidebarSlice';

export const OpenSidebar = () => {
    const dispatch = useAppDispatch();
    const handleToggleSidebar = () => dispatch(toggleActive());

    return (
        <div className="lg:hidden">
            <RoundedButton
                name="Sidebar"
                icon={faEllipsisVertical}
                onHover="opacity-70"
                callback={handleToggleSidebar}
            />
        </div>
    );
};
