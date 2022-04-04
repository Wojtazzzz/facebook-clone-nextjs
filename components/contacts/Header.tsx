import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/RoundedButton';

export const Header = () => {
    return (
        <div className="w-full flex justify-between items-center text-light-100 border-b-2 border-dark-200 pb-1 mb-3">
            <span className="text-lg font-medium">Contacts</span>

            <RoundedButton
                name="Search friend to message"
                icon={faSearch}
                size={10}
                bgColor="dark-300"
                onHover="bg-dark-100"
                callback={() => console.log('Action to implement')}
            />
        </div>
    );
};
