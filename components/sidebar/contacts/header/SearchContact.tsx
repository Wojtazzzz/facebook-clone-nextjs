import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/inc/RoundedButton';

export const SearchContact = () => {
    return (
        <RoundedButton
            label="Search friend to text"
            icon={faSearch}
            callback={() => console.log('Action to implement')}
        />
    );
};
