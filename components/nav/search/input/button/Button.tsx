import { ApiError } from './ApiError';
import { ClearButton } from './ClearButton';
import { SearchButton } from './SearchButton';

interface ButtonProps {
    isError: boolean;
    query: string;
    clear: () => void;
    focus: () => void;
}

export const Button = ({ isError, query, clear, focus }: ButtonProps) => {
    if (isError) return <ApiError />;

    if (!!query) return <ClearButton clear={clear} />;

    return <SearchButton focus={focus} />;
};
