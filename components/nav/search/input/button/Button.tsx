import { SadSmileError } from '@components/inc/SadSmileError';
import { ClearButton } from './ClearButton';
import { SearchButton } from './SearchButton';

interface ButtonProps {
    isError: boolean;
    query: string;
    clear: () => void;
}

export const Button = ({ isError, query, clear }: ButtonProps) => {
    if (isError) return <SadSmileError testId="search-apiError" size="xl" />;
    if (!!query) return <ClearButton clear={clear} />;

    return <SearchButton />;
};
