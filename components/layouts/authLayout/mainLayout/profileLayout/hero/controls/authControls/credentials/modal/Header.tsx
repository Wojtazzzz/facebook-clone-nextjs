import { RoundedButton } from '@components/inc/RoundedButton';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
    close: () => void;
}

export const Header = ({ close }: HeaderProps) => {
    return (
        <header className="w-full flex justify-between items-center text-light-200 border-zinc-600 border-b-[1.5px] p-3">
            <div className="w-[40px] h-[40px] invisible pointer-events-none"></div>

            <h1 id="credentialsModal-header" className="text-2xl text-center font-bold">
                Auth Credentials
            </h1>

            <RoundedButton
                label="Close modal"
                icon={faTimes}
                styles="hover:bg-dark-100 pointer-events-auto"
                callback={close}
            />
        </header>
    );
};
