import { RoundedButton } from '@components/inc/RoundedButton';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
    close: () => void;
}
export const Header = ({ close }: HeaderProps) => {
    return (
        <header className="w-full flex justify-between items-center text-light-200 border-zinc-600 border-b-[1.5px] p-3">
            <RoundedButton label="Close modal" icon={faTimes} styles="invisible pointer-events-none" callback={close} />

            <h3 id="updateModal-heading" className="text-2xl text-center font-bold">
                Update Post
            </h3>

            <RoundedButton label="Close modal" icon={faTimes} callback={close} />
        </header>
    );
};
