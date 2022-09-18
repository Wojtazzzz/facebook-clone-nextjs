import type { ChangeEvent, FormEvent } from 'react';
import { useKey } from '@hooks/useKey';
import { Button } from './button/Button';
import { useInputFocus } from '@hooks/useInputFocus';
import clsx from 'clsx';
import { useOutsideClick } from '@hooks/useOutsideClick';

interface SearchBoxProps {
    isActive: boolean;
    query: string;
    isError: boolean;
    changeQuery: (event: ChangeEvent<HTMLInputElement>) => void;
    clearQuery: () => void;
    open: () => void;
    close: () => void;
}

export const SearchBox = ({ isActive, query, isError, changeQuery, clearQuery, open, close }: SearchBoxProps) => {
    useKey('Escape', clearQuery);
    const ref = useOutsideClick<HTMLFormElement>(close);
    const { inputRef, focus } = useInputFocus();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        isActive
            ? (() => {
                  focus();
                  console.log('foc');
              })()
            : (() => {
                  open();
                  console.log('opn');
              })();
    };

    return (
        <form
            ref={ref}
            onSubmit={handleSubmit}
            role="search"
            className={clsx(
                'sm:w-[200px] lg:w-[220px] h-10 flex justify-center items-center gap-3 overflow-hidden transition-width text-dark-50 bg-dark-100 rounded-[50px] focus:outline-none',
                isActive ? 'w-[180px]' : 'w-[40px]'
            )}
        >
            <input
                ref={inputRef}
                aria-label="Search user"
                name="text"
                type="search"
                autoComplete="off"
                value={query}
                placeholder="Search User"
                className={clsx(
                    'sm:w-[150px] lg:w-[170px] text-sm sm:text-base bg-transparent focus:outline-none',
                    isActive ? 'w-[120px]' : 'w-0 hidden sm:inline-block'
                )}
                onChange={changeQuery}
            />

            <Button isError={isError} query={query} clear={clearQuery} />
        </form>
    );
};
