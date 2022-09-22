import { useKey } from '@hooks/useKey';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { List } from './list/List';

interface ResultsProps {
    query: string;
    clearQuery: () => void;
}

export const Results = ({ query, clearQuery }: ResultsProps) => {
    const ref = useOutsideClick<HTMLDivElement>(clearQuery);
    useKey('Escape', clearQuery);

    return (
        <div
            ref={ref}
            id="navSearch-results"
            data-testid="navSearch-results"
            className="w-full max-h-[450px] absolute top-10 left-0 overflow-auto bg-dark-200 overflow-y-auto rounded-md sm:shadow-md scrollbar-thin scrollbar-thumb-dark-100"
        >
            <List query={query} />
        </div>
    );
};
