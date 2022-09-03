import type { ChangeEvent } from 'react';

interface ListSwitcherProps {
    changeList: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const ListSwitcher = ({ changeList }: ListSwitcherProps) => {
    return (
        <div className="w-full flex justify-end items-center">
            <select
                aria-label="Change list of posts"
                name="list"
                defaultValue="own"
                className="w-full text-light-50 bg-dark-100 rounded-lg border-x-[12px] border-transparent transition-all hover:brightness-110 py-3"
                onChange={changeList}
            >
                <option value="own">Own posts</option>
                <option value="hidden">Hidden posts</option>
                <option value="saved">Saved posts</option>
            </select>
        </div>
    );
};
