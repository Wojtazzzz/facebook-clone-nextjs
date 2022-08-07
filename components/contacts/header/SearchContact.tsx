import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/inc/RoundedButton';

export const SearchContact = () => {
    return (
        <RoundedButton
            name="Search friend to text"
            icon={faSearch}
            size={10}
            bgColor="dark-300"
            onHover="bg-dark-100"
            callback={() => console.log('Action to implement')}
        />
    );
};
