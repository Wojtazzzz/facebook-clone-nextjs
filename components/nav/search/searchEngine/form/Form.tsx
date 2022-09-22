import { useInputFocus } from '@hooks/useInputFocus';
import type { ChangeEvent, FormEvent } from 'react';
import { Button } from './button/Button';

interface FormProps {
    query: string;
    changeQuery: (event: ChangeEvent<HTMLInputElement>) => void;
    clearQuery: () => void;
}

export const Form = ({ query, changeQuery, clearQuery }: FormProps) => {
    const { inputRef, focus } = useInputFocus();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
    };

    return (
        <form
            onSubmit={handleSubmit}
            role="search"
            className="w-full sm:w-[200px] lg:w-[220px] h-10 flex justify-center items-center gap-3 relative overflow-hidden transition-width text-dark-50 bg-dark-100 rounded-[50px] focus:outline-none px-4"
        >
            <Button query={query} clear={clearQuery} focus={focus} />

            <input
                ref={inputRef}
                aria-label="Search user"
                name="text"
                type="search"
                autoComplete="off"
                value={query}
                placeholder="Search User"
                className="w-full sm:w-[150px] lg:w-[170px] relative z-10 text-sm sm:text-base bg-transparent focus:outline-none"
                onChange={changeQuery}
            />
        </form>
    );
};
