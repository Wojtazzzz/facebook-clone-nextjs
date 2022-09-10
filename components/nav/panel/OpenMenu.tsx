import { RoundedButton } from '@components/inc/RoundedButton';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '@hooks/redux';
import { toggleActive } from '@redux/slices/MenuSlice';

export const OpenMenu = () => {
    const dispatch = useAppDispatch();
    const handleToggleMenu = () => dispatch(toggleActive());

    return (
        <div className="lg:hidden">
            <RoundedButton name="Menu" icon={faEllipsisVertical} onHover="opacity-70" callback={handleToggleMenu} />
        </div>
    );
};
