import { ClearButton } from './ClearButton';
import { SearchButton } from './SearchButton';

interface ButtonProps {
    query: string;
    clear: () => void;
    focus: () => void;
}

export const Button = ({ query, clear, focus }: ButtonProps) => {
    if (query) return <ClearButton clear={clear} />;

    return <SearchButton focus={focus} />;
};
